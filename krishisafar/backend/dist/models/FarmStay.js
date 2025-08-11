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
const farmStaySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Farm stay name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    host: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Host is required']
    },
    location: {
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        state: {
            type: String,
            required: [true, 'State is required']
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
            default: 'India'
        },
        zipCode: {
            type: String,
            required: [true, 'Zip code is required']
        },
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    pricePerNight: {
        type: Number,
        required: [true, 'Price per night is required'],
        min: [0, 'Price cannot be negative']
    },
    maxGuests: {
        type: Number,
        required: [true, 'Maximum guests is required'],
        min: [1, 'Must accommodate at least 1 guest'],
        max: [20, 'Cannot accommodate more than 20 guests']
    },
    bedrooms: {
        type: Number,
        required: [true, 'Number of bedrooms is required'],
        min: [1, 'Must have at least 1 bedroom']
    },
    bathrooms: {
        type: Number,
        required: [true, 'Number of bathrooms is required'],
        min: [1, 'Must have at least 1 bathroom']
    },
    amenities: [{
            type: String,
            enum: [
                'WiFi', 'Kitchen', 'Pool', 'Farm Animals', 'Organic Garden',
                'Yoga Space', 'Bonfire Area', 'Parking', 'Air Conditioning',
                'Heating', 'Laundry', 'Bicycle Rental', 'Fishing', 'Hiking Trails'
            ]
        }],
    experienceTypes: [{
            type: String,
            enum: [
                'Organic Farm', 'Animal Experience', 'Yoga Retreat', 'Workation',
                'Family Friendly', 'Adventure', 'Wellness', 'Cultural Immersion'
            ]
        }],
    photos: [{
            type: String,
            validate: {
                validator: function (v) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(v);
                },
                message: 'Photo must be a valid image URL'
            }
        }],
    availability: [{
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            }
        }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'pending'
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalReviews: {
        type: Number,
        default: 0,
        min: 0
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
// Index for location-based searches
farmStaySchema.index({ 'location.city': 1, 'location.state': 1 });
farmStaySchema.index({ pricePerNight: 1 });
farmStaySchema.index({ averageRating: -1 });
farmStaySchema.index({ status: 1 });
exports.default = mongoose_1.default.model('FarmStay', farmStaySchema);
//# sourceMappingURL=FarmStay.js.map