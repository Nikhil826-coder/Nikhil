import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";


export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  //  const newRoom = new Hotel(req.body);
        try{
            const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set: req.body},
                {new:true});
            res.status(200).json(updatedRoom);
        }catch(err){
          next(err);
        }
  };

  //DELETE
  export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
   try{
        await Room.findByIdAndDelete(req.params.id);
        try {
          await Hotel.findByIdAndUpdate(hotelId, {
            $pull: { rooms: req.params.id },
          });
        } catch (err) {
          next(err);
        }
           res.status(200).json("hall has been deleted.");
       }catch(err){
        next(err);
       }
  };
  //GET
  export const getRoom = async (req, res, next) => {
    //const newRoom = new Room(req.body);
    try{
         const room = await Room.findById(req.params.id);
            res.status(200).json(room);
        }catch(err){
          next(err);
        }
  };
  //GET ALL
  export const getRooms = async (req, res, next) => {
    //const newRooms = new Rooms(req.body);
    try{
         const rooms = await Room.find();
            res.status(200).json(rooms);
        }catch(err){
          next(err);
        }
  };

  export const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("hall status has been updated.");
    } catch (err) {
      next(err);
    }
  };
  /*import Room from "../models/Room.js";
  import Hotel from "../models/Hotel.js";
  //import Booking from "../models/Booking.js"; // Import Booking model
  import { createError } from "../utils/error.js";
  
  // ✅ Create Room & Link to Hotel
  export const createRoom = async (req, res, next) => {
      const hotelId = req.params.hotelid;
      const newRoom = new Room(req.body);
  
      try {
          const savedRoom = await newRoom.save();
          await Hotel.findByIdAndUpdate(hotelId, {
              $push: { rooms: savedRoom._id },
          });
          res.status(201).json(savedRoom);
      } catch (err) {
          next(err);
      }
  };
  
  // ✅ Update Room Details
  export const updateRoom = async (req, res, next) => {
      try {
          const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  
          if (!updatedRoom) return next(createError(404, "Room not found"));
  
          res.status(200).json(updatedRoom);
      } catch (err) {
          next(err);
      }
  };
  
  // ✅ Delete Room & Remove from Hotel
  export const deleteRoom = async (req, res, next) => {
      const hotelId = req.params.hotelid;
      try {
          const room = await Room.findById(req.params.id);
          if (!room) return next(createError(404, "Room not found"));
  
          await Room.findByIdAndDelete(req.params.id);
          await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
  
          res.status(200).json({ message: "Room has been deleted successfully." });
      } catch (err) {
          next(err);
      }
  };
  
  // ✅ Get a Single Room
  export const getRoom = async (req, res, next) => {
      try {
          const room = await Room.findById(req.params.id);
          if (!room) return next(createError(404, "Room not found"));
  
          res.status(200).json(room);
      } catch (err) {
          next(err);
      }
  };
  
  // ✅ Get All Rooms
  export const getRooms = async (req, res, next) => {
      try {
          const rooms = await Room.find();
          res.status(200).json(rooms);
      } catch (err) {
          next(err);
      }
  };
  
  // ✅ Update Room Availability
  export const updateRoomAvailability = async (req, res, next) => {
    try {
      console.log("Updating Room Availability for:", req.params.id);
      console.log("Received Dates:", req.body.dates);
  
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $push: { unavailableDates: req.body.dates } },
        { new: true }
      );
  
      if (!updatedRoom) {
        console.error("Room Not Found:", req.params.id);
        return next(createError(404, "Room not found"));
      }
  
      console.log("Room Updated Successfully:", updatedRoom);
      res.status(200).json({ message: "Room status has been updated.", updatedRoom });
    } catch (err) {
      console.error("Error Updating Room Availability:", err);
      next(err);
    }
  };
  
  
  /*export const updateRoomAvailability = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            { $push: { unavailableDates: req.body.dates } }, 
            { new: true }
        );

        if (!updatedRoom) return res.status(404).json({ message: "Room not found" });

        res.status(200).json({ message: "Room status updated successfully", updatedRoom });
    } catch (err) {
        next(err);
    }
};

  
  // ✅ Cancel Booking and Free Up Rooms
  export const cancelBooking = async (req, res, next) => {
      try {
          const booking = await Booking.findOne({ transactionId: req.params.transactionId });
  
          if (!booking) {
              return next(createError(404, "Booking not found"));
          }
  
          if (booking.status === "Cancelled") {
              return res.status(400).json({ message: "Booking is already cancelled" });
          }
  
          // Free up the booked rooms (halls)
          try {
              await Promise.all(
                  booking.rooms.map(async (roomId) => {
                      await Room.findByIdAndUpdate(roomId, { isBooked: false });
                  })
              );
          } catch (err) {
              return next(err);
          }
  
          // Update booking status to "Cancelled"
          booking.status = "Cancelled";
          await booking.save();
  
          res.status(200).json({ message: "Booking cancelled successfully", updatedBooking: booking });
      } catch (err) {
          console.error("Error cancelling booking:", err);
          next(err);
      }
  };*/
  