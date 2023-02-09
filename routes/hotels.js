import express from "express";
import { createHotels, deleteHotels, getAllHotels, getHotels, updateHotels } from "../controllers/hotels.js";
// import Hotel from "../models/Hotels.js"
// import { createError } from "../utils/errors.js";
const router = express.Router();


//create
router.post("/", createHotels);
//update
router.put("/:id", updateHotels);
//delete
router.delete("/:id", deleteHotels);
//get
router.get("/:id", getHotels);
//GetAll
router.get("/", getAllHotels);


// router.get("/", (req, res) => {
//     res.send("Hello Mehul from Router ");
// })

export default router; 