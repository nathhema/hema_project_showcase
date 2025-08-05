import mongoose, { Document, Schema } from 'mongoose';

export interface IFarmStay extends Document {
  name: string;
  host: mongoose.Types.ObjectId;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  description: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  experienceTypes: string[];
  photos: string[];
  availability: {
    startDate: Date;
    endDate: Date;
  }[];
  status: 'active' | 'inactive' | 'pending';
  averageRating: number;
  totalReviews: number;
  createdDate: Date;
}

const farmStaySchema = new Schema<IFarmStay>({
  name: {
    type: String,
    required: [true, 'Farm stay name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  host: {
    type: Schema.Types.ObjectId,
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
      validator: function(v: string) {
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

export default mongoose.model<IFarmStay>('FarmStay', farmStaySchema);