import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IBooking, {}, {}, {}, mongoose.Document<unknown, {}, IBooking, {}, {}> & IBooking & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Booking.d.ts.map