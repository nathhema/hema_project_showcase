"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bookingSchema = new mongoose_1.Schema({
    traveler: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Traveler is required']
    },
    farmStay: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'FarmStay',
        required: [true, 'Farm stay is required']
    },
    checkInDate: {
        type: Date,
        required: [true, 'Check-in date is required'],
        validate: {
            validator: function (v) {
                return v >= new Date();
            },
            message: 'Check-in date must be in the future'
        }
    },
    checkOutDate: {
        type: Date,
        required: [true, 'Check-out date is required'],
        validate: {
            validator: function (v) {
                return v > this.checkInDate;
            },
            message: 'Check-out date must be after check-in date'
        }
    },
    guests: {
        type: Number,
        required: [true, 'Number of guests is required'],
        min: [1, 'Must have at least 1 guest']
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price cannot be negative']
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    specialRequests: {
        type: String,
        maxlength: [500, 'Special requests cannot exceed 500 characters']
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
// Calculate number of nights
bookingSchema.virtual('nights').get(function () {
    const timeDiff = this.checkOutDate.getTime() - this.checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
});
// Index for efficient queries
bookingSchema.index({ traveler: 1, createdDate: -1 });
bookingSchema.index({ farmStay: 1, checkInDate: 1 });
bookingSchema.index({ bookingStatus: 1 });
bookingSchema.index({ checkInDate: 1, checkOutDate: 1 });
exports.default = mongoose_1.default.model('Booking', bookingSchema);
//# sourceMappingURL=Booking.js.map