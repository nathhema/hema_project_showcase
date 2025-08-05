import { Request, Response } from 'express';
import FarmStay from '../models/FarmStay';
import { AuthRequest } from '../middleware/auth';

export const getFarmStays = async (req: Request, res: Response) => {
  try {
    const {
      location,
      minPrice,
      maxPrice,
      guests,
      amenities,
      experienceTypes,
      page = 1,
      limit = 12,
      sortBy = 'createdDate'
    } = req.query;

    // Build query object
    let query: any = { status: 'active' };

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
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
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
    let sortOptions: any = {};
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

    const farmStays = await FarmStay.find(query)
      .populate('host', 'name profilePhoto verificationStatus')
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await FarmStay.countDocuments(query);

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching farm stays'
    });
  }
};

export const getFarmStayById = async (req: Request, res: Response) => {
  try {
    const farmStay = await FarmStay.findById(req.params.id)
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching farm stay'
    });
  }
};

export const createFarmStay = async (req: AuthRequest, res: Response) => {
  try {
    const farmStayData = {
      ...req.body,
      host: req.user?.id
    };

    const farmStay = await FarmStay.create(farmStayData);
    
    res.status(201).json({
      success: true,
      message: 'Farm stay created successfully',
      data: farmStay
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating farm stay'
    });
  }
};

export const updateFarmStay = async (req: AuthRequest, res: Response) => {
  try {
    const farmStay = await FarmStay.findById(req.params.id);

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

    const updatedFarmStay = await FarmStay.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Farm stay updated successfully',
      data: updatedFarmStay
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error updating farm stay'
    });
  }
};

export const deleteFarmStay = async (req: AuthRequest, res: Response) => {
  try {
    const farmStay = await FarmStay.findById(req.params.id);

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

    await FarmStay.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Farm stay deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting farm stay'
    });
  }
};

export const getHostFarmStays = async (req: AuthRequest, res: Response) => {
  try {
    const farmStays = await FarmStay.find({ host: req.user?.id })
      .sort({ createdDate: -1 });

    res.json({
      success: true,
      data: farmStays
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching host farm stays'
    });
  }
};