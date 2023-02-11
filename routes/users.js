import express from "express";
const router = express.Router();
import { createUser, deleteUser, getAllUser, getUser, updateUser } from "../controllers/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


// router.get("/checkauthentication/:id", verifyToken, (req, res, next) => {
//     res.send("Hello user, you are authenticated");
// })

// router.get("/checkadmin/:id", verifyToken, (req, res, next) => {
//     res.send("Hello admion, you are logged in and you can delete any account ");
// })


// router.get("/checkuser/:id", verifyToken, (req, res, next) => {
//     res.send("Hello user, you are logged in your account");
// })



//create
router.post("/", verifyUser, createUser);
//update
router.put("/:id", verifyUser, updateUser);
//delete
router.delete("/:id", verifyUser, deleteUser);
//get
router.get("/:id", verifyUser, getUser);
//GetAll
router.get("/", verifyAdmin, getAllUser);


// router.get("/", (req, res) => {
//     res.send("Hello Mehul from Router ");
// })

export default router; 