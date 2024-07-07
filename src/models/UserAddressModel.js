import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserAddressModel = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user_datas', required: true },
    addressMobile: { type: String, required: true },
    fullAddress: { type: String, required: true },
    addressPincode: { type: String, required: true },
    addressState: { type: String, required: true },
    addressType: { type: Number, default: 1 },
    addressStatus: { type: String, enum: ['ACTIVE', 'IN-ACTIVE'], default: 'ACTIVE' },
}, {
    timestamps: true,
});

export default mongoose.model('user_address_datas', UserAddressModel);
