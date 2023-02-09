import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js";
// import usersRoute from "./routes/users.js";
// import roomsRoute from "./routes/rooms.js";
import hotelsRoute from "./routes/hotels.js";


mongoose.set('strictQuery', true);
const app = express();
dotenv.config()


const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_CONN);
        console.log("connecting to mongoDb");
    } catch (err) {
        throw err

    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDb disconnected")
});


mongoose.connection.on("connected", () => {
    console.log("mongoDb connected")
});


//middlewares
app.use(express.json())

app.use("/api/auth", authRoute);
// app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
// app.use("/api/rooms", roomsRoute);


app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || "Something went wrong"

    return res.status(errStatus).json({
        succes: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack,
    })
})

app.listen(5000, () => {
    connect();
    console.log("Server is up and running");
})