import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IFarmStay, {}, {}, {}, mongoose.Document<unknown, {}, IFarmStay, {}, {}> & IFarmStay & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=FarmStay.d.ts.map