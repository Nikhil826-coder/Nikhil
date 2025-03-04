import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";  // ✅ Import Hotel model

 
/*import mongoose from "mongoose";
export const createBooking = async (req, res) => {
  try {
    const { userId, hotelId, rooms, checkIn, checkOut, totalAmount, transactionId } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ error: "Invalid user or hotel ID" });
    }

    const validRooms = rooms.filter(room => mongoose.Types.ObjectId.isValid(room));
    if (validRooms.length !== rooms.length) {
      return res.status(400).json({ error: "One or more invalid room IDs" });
    }

    const booking = new Booking({
      userId: new mongoose.Types.ObjectId(userId),
      hotelId: new mongoose.Types.ObjectId(hotelId),
      rooms: validRooms.map(room => new mongoose.Types.ObjectId(room)), // ✅ Convert to ObjectId
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      totalAmount,
      transactionId
    });

    await booking.save();
    res.status(201).json({ success: true, message: "Booking created successfully", booking });
  } catch (error) {
    res.status(400).json({ error: "Failed to create booking", details: error.message });
  }
};*/
import mongoose from "mongoose"

export const createBooking = async (req, res) => {
  try {
    const { userId, hotelId, rooms, checkIn, checkOut, totalAmount, transactionId } = req.body;

    const booking = new Booking({
      userId: new mongoose.Types.ObjectId(userId),
      hotelId: new mongoose.Types.ObjectId(hotelId),
      rooms: rooms.map(room => new mongoose.Types.ObjectId(room)), // ✅ Convert each room ID properly
      checkIn: new Date(checkIn),  // ✅ Ensure check-in date is properly formatted
      checkOut: new Date(checkOut),  // ✅ Ensure check-out date is properly formatted
      totalAmount,
      transactionId
    });

    await booking.save();
    res.status(201).json({ success: true, message: "Booking created successfully", booking });
  } catch (error) {
    res.status(400).json({ error: "Failed to create booking", details: error.message });
  }
};

export const getBookingsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    /*const bookings = await Booking.find({ userId })
      .populate("hotelId", "name location") // ✅ Populate hotel details
      .populate("rooms", "number title type") 
 // ✅ Populate room details*/
 const bookings = await Booking.find({ userId })
  .populate("hotelId", "name address") // ✅ Get hotel details
  .populate("rooms", "title price numbers "); // ✅ Populate rooms

 



    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};


export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    booking.status = "cancelled";
    booking.cancelledAt = new Date();
    await booking.save();

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Error cancelling booking" });
  }
};
