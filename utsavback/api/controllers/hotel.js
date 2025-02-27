import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
//import { createError } from "../utils/error.js";
//CREATE
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
  
    try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (err) {
      next(err);
    }
  };

  //UPDATE
  export const updateHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
        try{
            const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},
                {new:true});
            res.status(200).json(updateHotel);
        }catch(err){
          next(err);
        }
  };

  //DELETE
  export const deleteHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
   try{
        await Hotel.findByIdAndDelete(req.params.id);
           res.status(200).json("Hotel has been deleted.");
       }catch(err){
        next(err);
       }
  };
  //GET
  export const getHotel = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  };
  //GET ALL
  export const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };
   
  //count by City
  export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };
//count by type
  export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const beechsideCount = await Hotel.countDocuments({ type: "beechside" });
      const culturalCount = await Hotel.countDocuments({ type: "cultural" });
      const indowesternCount = await Hotel.countDocuments({ type: "indowestern" });
      const westernCount = await Hotel.countDocuments({ type: "western" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "beechside", count: beechsideCount },
        { type: "cultural", count: culturalCount },
        { type: "indowestern", count: indowesternCount },
        { type: "western", count: westernCount },
      ]);
    } catch (err) {
      next(err);
    }
  };

  //get all hotel rooms
  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
  
  /*// Get hotels by city
  export const gethotels = async (req, res, next) => {
    const { city, min = 1, max = 9999, ...others } = req.query;
  
    try {
      const query = {
        ...others,
        cheapestPrice: { $gte: Number(min), $lte: Number(max) },
      };
  
      // If a city is provided, add it to the query
      if (city) {
        query.city = { $regex: new RegExp(city, "i") }; // Case-insensitive search
      }
  
      console.log("Search Query:", query); // Debugging
  
      const hotels = await Hotel.find(query).limit(Number(req.query.limit) || 10);
  
      if (hotels.length === 0) {
        return res.status(404).json({ message: "No hotels found in this city." });
      }
  
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };*/
  