import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategoryModel = new Schema({
    categoryName: { type: String, required: true },
    categoryDesc: { type: String, default: '' },
    categorySort: { type: Number, default: 1 },
    categoryStatus: { type: String, enum: ['ACTIVE', 'IN-ACTIVE'], default: 'ACTIVE' },
});

export default mongoose.model('category_datas', CategoryModel);
