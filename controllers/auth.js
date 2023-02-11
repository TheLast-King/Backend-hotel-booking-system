import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/errors.js";
import jwt from "jsonwebtoken";


export const register = async (req, res, next) => {
    // res.send("Hello Mehul from Router ");
    console.log("line 9")

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        console.log("after new user line 18")
        await newUser.save()
        res.status(200).send("User has been created");

        console.log("after new user line 24")

    } catch (err) {
        next(err)
    }


};


export const login = async (req, res, next) => {
    console.log("Hello line 35")
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "Users not found"));
        console.log("Hello line 39")

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or Username"));
        console.log("Hello line 43")

        const { password, isAdmin, ...otherdetails } = user._doc;
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
        console.log("Hello line 47")

        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });


    } catch (err) {
        next(err)
    }


};