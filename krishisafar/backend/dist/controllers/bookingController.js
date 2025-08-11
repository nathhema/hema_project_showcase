"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingStatus = exports.getBookingById = exports.getHostBookings = exports.getUserBookings = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const FarmStay_1 = __importDefault(require("../models/FarmStay"));
const createBooking = async (req, res) => {
    try {
        const { farmStayId, checkInDate, checkOutDate, guests, specialRequests } = req.body;
        // Check if farm stay exists and is active
        const farmStay = await FarmStay_1.default.findById(farmStayId);
        if (!farmStay || farmStay.status !== 'active') {
            return res.status(404).json({
                success: false,
                message: 'Farm stay not found or not available'
            });
        }
        // Check guest capacity
        if (guests > farmStay.maxGuests) {
            return res.status(400).json({
                success: false,
                message: `Maximum guests allowed: ${farmStay.maxGuests}`
            });
        }
        // Calculate total price
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
        const totalPrice = nights * farmStay.pricePerNight;
        // Check for conflicting bookings
        const conflictingBooking = await Booking_1.default.findOne({
            farmStay: farmStayId,
            bookingStatus: { $in: ['confirmed', 'pending'] },
            $or: [
                {
                    checkInDate: { $lte: checkOut },
                    checkOutDate: { $gte: checkIn }
                }
            ]
        });
        if (conflictingBooking) {
            return res.status(400).json({
                success: false,
                message: 'Farm stay is not available for selected dates'
            });
        }
        // Create booking
        const booking = await Booking_1.default.create({
            traveler: req.user?.id,
            farmStay: farmStayId,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            guests,
            totalPrice,
            specialRequests
        });
        const populatedBooking = await Booking_1.default.findById(booking._id)
            .populate('farmStay', 'name location.city photos pricePerNight')
            .populate('traveler', 'name email phone');
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: populatedBooking
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error creating booking'
        });
    }
};
exports.createBooking = createBooking;
const getUserBookings = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        let query = { traveler: req.user?.id };
        if (status) {
            query.bookingStatus = status;
        }
        const skip = (Number(page) - 1) * Number(limit);
        const bookings = await Booking_1.default.find(query)
            .populate('farmStay', 'name location photos pricePerNight host')
            .populate({
            path: 'farmStay',
            populate: {
                path: 'host',
                select: 'name phone email'
            }
        })
            .sort({ createdDate: -1 })
            .skip(skip)
            .limit(Number(limit));
        const total = await Booking_1.default.countDocuments(query);
        res.json({
            success: true,
            data: bookings,
            pagination: {
                current: Number(page),
                total: Math.ceil(total / Number(limit)),
                count: bookings.length,
                totalRecords: total
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error fetching bookings'
        });
    }
};
exports.getUserBookings = getUserBookings;
const getHostBookings = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        // First get all farm stays belonging to the host
        const hostFarmStays = await FarmStay_1.default.find({ host: req.user?.id }).select('_id');
        const farmStayIds = hostFarmStays.map(fs => fs._id);
        let query = { farmStay: { $in: farmStayIds } };
        if (status) {
            query.bookingStatus = status;
        }
        const skip = (Number(page) - 1) * Number(limit);
        const bookings = await Booking_1.default.find(query)
            .populate('farmStay', 'name location photos pricePerNight')
            .populate('traveler', 'name phone email profilePhoto')
            .sort({ createdDate: -1 })
            .skip(skip)
            .limit(Number(limit));
        const total = await Booking_1.default.countDocuments(query);
        res.json({
            success: true,
            data: bookings,
            pagination: {
                current: Number(page),
                total: Math.ceil(total / Number(limit)),
                count: bookings.length,
                totalRecords: total
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error fetching host bookings'
        });
    }
};
exports.getHostBookings = getHostBookings;
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking_1.default.findById(req.params.id)
            .populate('traveler', 'name phone email profilePhoto')
            .populate({
            path: 'farmStay',
            select: 'name location photos pricePerNight host amenities',
            populate: {
                path: 'host',
                select: 'name phone email profilePhoto'
            }
        });
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        // Check if user is authorized to view this booking
        const isOwner = booking.traveler._id.toString() === req.user?.id;
        const isHost = booking.farmStay.host._id.toString() === req.user?.id;
        const isAdmin = req.user?.userType === 'admin';
        if (!isOwner && !isHost && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this booking'
            });
        }
        res.json({
            success: true,
            data: booking
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error fetching booking'
        });
    }
};
exports.getBookingById = getBookingById;
const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking_1.default.findById(req.params.id).populate('farmStay');
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        // Check authorization - only host can confirm/cancel, travelers can cancel
        const isHost = booking.farmStay.host.toString() === req.user?.id;
        const isTraveler = booking.traveler.toString() === req.user?.id;
        const isAdmin = req.user?.userType === 'admin';
        if (!isHost && !isTraveler && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this booking'
            });
        }
        // Validation for status changes
        if (status === 'confirmed' && !isHost && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Only hosts can confirm bookings'
            });
        }
        booking.bookingStatus = status;
        await booking.save();
        res.json({
            success: true,
            message: 'Booking status updated successfully',
            data: booking
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error updating booking'
        });
    }
};
exports.updateBookingStatus = updateBookingStatus;
//# sourceMappingURL=bookingController.js.map