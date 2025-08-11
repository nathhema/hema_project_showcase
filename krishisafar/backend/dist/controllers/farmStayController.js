"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostFarmStays = exports.deleteFarmStay = exports.updateFarmStay = exports.createFarmStay = exports.getFarmStayById = exports.getFarmStays = void 0;
const FarmStay_1 = __importDefault(require("../models/FarmStay"));
const getFarmStays = async (req, res) => {
    try {
        const { location, minPrice, maxPrice, guests, amenities, experienceTypes, page = 1, limit = 12, sortBy = 'createdDate' } = req.query;
        // Build query object
        let query = { status: 'active' };
        // Location filter
        if (location) {
            query.$or = [
                { 'location.city': { $regex: location, $options: 'i' } },
                { 'location.state': { $regex: location, $options: 'i' } }
            ];
        }
        // Price range filter
        if (minPrice || maxPrice) {
            query.pricePerNight = {};
            if (minPrice)
                query.pricePerNight.$gte = Number(minPrice);
            if (maxPrice)
                query.pricePerNight.$lte = Number(maxPrice);
        }
        // Guest capacity filter
        if (guests) {
            query.maxGuests = { $gte: Number(guests) };
        }
        // Amenities filter
        if (amenities) {
            const amenitiesArray = typeof amenities === 'string' ? [amenities] : amenities;
            query.amenities = { $in: amenitiesArray };
        }
        // Experience types filter
        if (experienceTypes) {
            const experienceArray = typeof experienceTypes === 'string' ? [experienceTypes] : experienceTypes;
            query.experienceTypes = { $in: experienceArray };
        }
        // Sorting
        let sortOptions = {};
        switch (sortBy) {
            case 'price':
                sortOptions = { pricePerNight: 1 };
                break;
            case 'rating':
                sortOptions = { averageRating: -1 };
                break;
            case 'popular':
                sortOptions = { totalReviews: -1 };
                break;
            default:
                sortOptions = { createdDate: -1 };
        }
        // Pagination
        const skip = (Number(page) - 1) * Number(limit);
        const farmStays = await FarmStay_1.default.find(query)
            .populate('host', 'name profilePhoto verificationStatus')
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));
        const total = await FarmStay_1.default.countDocuments(query);
        res.json({
            success: true,
            data: farmStays,
            pagination: {
                current: Number(page),
                total: Math.ceil(total / Number(limit)),
                count: farmStays.length,
                totalRecords: total
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error fetching farm stays'
        });
    }
};
exports.getFarmStays = getFarmStays;
const getFarmStayById = async (req, res) => {
    try {
        const farmStay = await FarmStay_1.default.findById(req.params.id)
            .populate('host', 'name profilePhoto bio verificationStatus joinedDate');
        if (!farmStay) {
            return res.status(404).json({
                success: false,
                message: 'Farm stay not found'
            });
        }
        res.json({
            success: true,
            data: farmStay
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error fetching farm stay'
        });
    }
};
exports.getFarmStayById = getFarmStayById;
const createFarmStay = async (req, res) => {
    try {
        const farmStayData = {
            ...req.body,
            host: req.user?.id
        };
        const farmStay = await FarmStay_1.default.create(farmStayData);
        res.status(201).json({
            success: true,
            message: 'Farm stay created successfully',
            data: farmStay
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error creating farm stay'
        });
    }
};
exports.createFarmStay = createFarmStay;
const updateFarmStay = async (req, res) => {
    try {
        const farmStay = await FarmStay_1.default.findById(req.params.id);
        if (!farmStay) {
            return res.status(404).json({
                success: false,
                message: 'Farm stay not found'
            });
        }
        // Check if user is the host or admin
        if (farmStay.host.toString() !== req.user?.id && req.user?.userType !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this farm stay'
            });
        }
        const updatedFarmStay = await FarmStay_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json({
            success: true,
            message: 'Farm stay updated successfully',
            data: updatedFarmStay
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error updating farm stay'
        });
    }
};
exports.updateFarmStay = updateFarmStay;
const deleteFarmStay = async (req, res) => {
    try {
        const farmStay = await FarmStay_1.default.findById(req.params.id);
        if (!farmStay) {
            return res.status(404).json({
                success: false,
                message: 'Farm stay not found'
            });
        }
        // Check if user is the host or admin
        if (farmStay.host.toString() !== req.user?.id && req.user?.userType !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this farm stay'
            });
        }
        await FarmStay_1.default.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: 'Farm stay deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error deleting farm stay'
        });
    }
};
exports.deleteFarmStay = deleteFarmStay;
const getHostFarmStays = async (req, res) => {
    try {
        const farmStays = await FarmStay_1.default.find({ host: req.user?.id })
            .sort({ createdDate: -1 });
        res.json({
            success: true,
            data: farmStays
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error fetching host farm stays'
        });
    }
};
exports.getHostFarmStays = getHostFarmStays;
//# sourceMappingURL=farmStayController.js.map