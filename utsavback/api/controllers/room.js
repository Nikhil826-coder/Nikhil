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
 /* import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return next(createError(404, "Room not found"));

    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params.id },
    });
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return next(createError(404, "Room not found"));
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    const room = await Room.findOne({ "roomNumbers._id": req.params.id });
    if (!room) return next(createError(404, "Room not found"));

    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": { $each: req.body.dates },
        },
      }
    );
    res.status(200).json("Room availability updated.");
  } catch (err) {
    next(err);
  }
};
*/