import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  traveler: mongoose.Types.ObjectId;
  farmStay: mongoose.Types.ObjectId;
  checkInDate: Date;
  checkOutDate: Date;
  guests: number;
  totalPrice: number;
  bookingStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  specialRequests?: string;
  createdDate: Date;
}

const bookingSchema = new Schema<IBooking>({
  traveler: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Traveler is required']
  },
  farmStay: {
    type: Schema.Types.ObjectId,
    ref: 'FarmStay',
    required: [true, 'Farm stay is required']
  },
  checkInDate: {
    type: Date,
    required: [true, 'Check-in date is required'],
    validate: {
      validator: function(v: Date) {
        return v >= new Date();
      },
      message: 'Check-in date must be in the future'
    }
  },
  checkOutDate: {
    type: Date,
    required: [true, 'Check-out date is required'],
    validate: {
      validator: function(this: IBooking, v: Date) {
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
bookingSchema.virtual('nights').get(function() {
  const timeDiff = this.checkOutDate.getTime() - this.checkInDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
});

// Index for efficient queries
bookingSchema.index({ traveler: 1, createdDate: -1 });
bookingSchema.index({ farmStay: 1, checkInDate: 1 });
bookingSchema.index({ bookingStatus: 1 });
bookingSchema.index({ checkInDate: 1, checkOutDate: 1 });

export default mongoose.model<IBooking>('Booking', bookingSchema);