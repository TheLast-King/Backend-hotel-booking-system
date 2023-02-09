import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/errors.js";


export const register = async (req, res, next) => {
    // res.send("Hello Mehul from Router ");
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save()
        res.status(200).send("User has been created");


    } catch (err) {
        next(err)
    }


};


export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "Users not found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or Username"));

        const { password, isAdmin, ...otherdetails } = user._doc;
        res.status(200).json(otherdetails);


    } catch (err) {
        next(err)
    }


};