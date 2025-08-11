"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.default.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Token is not valid.'
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token is not valid.'
        });
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. User not authenticated.'
            });
        }
        if (!roles.includes(req.user.userType)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. ${req.user.userType} role is not authorized.`
            });
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map