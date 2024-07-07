import { successResponse } from '../utils/common/makeResponse.js';
import * as userService from '../services/UserService.js';

/*
*----------------------
*/
export const addNewUser = async (req, res, next) => {
    try {
        const formData = { ...req.body };
        await userService.insertNewUser(formData);

        return res.status(200).json(successResponse('New User added Successfully', {}));
    } catch (error) {
        return next(error);
    }
};

/*------------------*/
export const getAllUser = async (req, res, next) => {
    try {
        const userData = await userService.fetchAllUser();

        return res.status(200).json(successResponse('All Users', { userData }));
    } catch (error) {
        return next(error);
    }
};

/*------------------*/
export const addNewAddress = async (req, res, next) => {
    try {
        const formData = { ...req.body };
        await userService.insertNewAddress(formData);

        return res.status(200).json(successResponse('New Address added Successfully', {}));
    } catch (error) {
        return next(error);
    }
};

/*------------------*/
export const getAllAddress = async (req, res, next) => {
    try {
        const addressData = await userService.fetchAllAddress();

        return res.status(200).json(successResponse('All Address', { addressData }));
    } catch (error) {
        return next(error);
    }
};

/*------------------*/
export const addNewCategory = async (req, res, next) => {
    try {
        const formData = { ...req.body };
        await userService.insertNewCategory(formData);

        return res.status(200).json(successResponse('New Category added Successfully', {}));
    } catch (error) {
        return next(error);
    }
};

/*------------------*/
export const getAllCategory = async (req, res, next) => {
    try {
        const categoryData = await userService.fetchAllCategory();

        return res.status(200).json(successResponse('All Category', { categoryData }));
    } catch (error) {
        return next(error);
    }
};