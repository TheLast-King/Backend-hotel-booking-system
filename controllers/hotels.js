import Hotel from "../models/Hotels.js";
import { createError } from "../utils/errors.js";

export const createHotels = async (req, res, next) => {
    const newHotels = new Hotel(req.body)

    try {
        const savedHotels = await newHotels.save()
        res.status(200).json(savedHotels)
    } catch (err) {
        next(err)
    }
};


export const updateHotels = async (req, res) => {
    try {
        const updateHotels = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updateHotels)
    } catch (err) {
        next(err)
    }

};


export const deleteHotels = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotels has been deleted");
    } catch (err) {
        next(err)
    }

};


export const getHotels = async (req, res, next) => {
    try {
        const Hotels = await Hotel.findById(req.params.id);
        res.status(200).json(Hotels);
    } catch (err) {
        next(err);
    }
};


export const getAllHotels = async (req, res, next) => {
    // const failed = true;
    if (failed) return next(createError(401, "You are not authenticated"));
    // console.log("Hi, I am Hotels route");
    // next();
    try {
        const getAllHotels = await Hotel.find()
        res.status(200).json(getAllHotels)
    } catch (err) {
        next(err)
    }

};