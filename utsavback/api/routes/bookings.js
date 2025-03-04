import express from "express";
import { getBookingsByUser, cancelBooking, createBooking } from "../controllers/booking.js";  // ✅ Correct function name


const router = express.Router();

router.post("/", createBooking);
router.get("/:userId", getBookingsByUser);
router.put("/cancel/:id", cancelBooking);

export default router; // ✅ Use `export default` instead of `module.exports`
