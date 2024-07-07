import CategoryModel from '../models/CategoryModel.js';
import UserDataModel from '../models/UserDataModel.js';
import UserAddressModel from '../models/UserAddressModel.js';

/*
*-------------------------------
*/
export const fetchAllCategory = async () => {
    const data = await CategoryModel.find();
    return data;
};

export const insertNewCategory = async (dt) => {
    const data = new CategoryModel(dt);
    const insertedData = await data.save();
    return insertedData;
};

/*----------------*/
export const fetchAllUser = async () => {
    const data = await UserDataModel.find();
    return data;
};

export const insertNewUser = async (dt) => {
    const data = new UserDataModel(dt);
    const insertedData = await data.save();
    return insertedData;
};

/*----------------*/
export const fetchAllAddress = async () => {
    const data = await UserAddressModel.find();
    return data;
};

export const insertNewAddress = async (dt) => {
    const data = new UserAddressModel(dt);
    const insertedData = await data.save();
    return insertedData;
};