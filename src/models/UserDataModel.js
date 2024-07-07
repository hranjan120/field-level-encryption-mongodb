import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserDataModel = new Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true, trim: true },
    userMobile: { type: String, required: true, unique: true },
    userCountry: { type: String, default: '' },
    userStatus: { type: String, enum: ['ACTIVE', 'IN-ACTIVE'], default: 'ACTIVE' },
}, {
    timestamps: true,
});

export default mongoose.model('user_datas', UserDataModel);
