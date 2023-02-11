import express from "express";
import { createHotels, deleteHotels, getAllHotels, getHotels, updateHotels } from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";
// import Hotel from "../models/Hotels.js"
// import { createError } from "../utils/errors.js";
const router = express.Router();


//create
router.post("/", verifyAdmin, createHotels);
//update
router.put("/:id", verifyAdmin, updateHotels);
//delete
router.delete("/:id", verifyAdmin, deleteHotels);
//get
router.get("/:id", getHotels);
//GetAll
router.get("/", getAllHotels);


// router.get("/", (req, res) => {
//     res.send("Hello Mehul from Router ");
// })

export default router; 