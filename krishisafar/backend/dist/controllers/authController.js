"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({ id }, secret, { expiresIn: '7d' });
};
const signup = async (req, res) => {
    try {
        const { name, email, password, phone, userType } = req.body;
        // Normalize and validate input
        const normalizedEmail = (email || '').toString().trim().toLowerCase();
        if (!normalizedEmail || !password || !name) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and password are required'
            });
        }
        // Check if user already exists
        const existingUser = await User_1.default.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }
        // Create new user
        const user = await User_1.default.create({
            name,
            email: normalizedEmail,
            password,
            phone,
            userType: userType || 'traveler'
        });
        const token = generateToken(user._id.toString());
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                verificationStatus: user.verificationStatus
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error during signup'
        });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Basic validation
        const normalizedEmail = (email || '').toString().trim().toLowerCase();
        if (!normalizedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }
        // Find user and include password
        const user = await User_1.default.findOne({ email: normalizedEmail }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const token = generateToken(user._id.toString());
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                verificationStatus: user.verificationStatus
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error during login'
        });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user?.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                profilePhoto: user.profilePhoto,
                bio: user.bio,
                userType: user.userType,
                verificationStatus: user.verificationStatus,
                joinedDate: user.joinedDate
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error getting profile'
        });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const { name, phone, bio, profilePhoto } = req.body;
        const user = await User_1.default.findByIdAndUpdate(req.user?.id, { name, phone, bio, profilePhoto }, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                profilePhoto: user.profilePhoto,
                bio: user.bio,
                userType: user.userType,
                verificationStatus: user.verificationStatus
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error updating profile'
        });
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=authController.js.map