import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms,updateRoomAvailability, updateRoom, } from "../controllers/room.js";
//import Hotel from "../models/Hotel.js";
 //import Room from "../models/Room.js";
  import {verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();

 //CREATE
 router.post("/:hotelid", verifyAdmin, createRoom);
    
 //UPDATE
 router.put("/:id", verifyAdmin,updateRoom);
 router.put("/availability/:id", updateRoomAvailability);

 //DELETE
 router.delete("/:id/:hotelid",verifyAdmin, deleteRoom);

 //GET
 router.get("/:id", getRoom);
 
 //GET ALL
 router.get("/", getRooms);

 //router.put("/cancel/:transactionId", cancelBooking);

export default router;