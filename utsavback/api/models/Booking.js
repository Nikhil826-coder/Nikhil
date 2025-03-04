 
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  rooms: [{ type: String, required: true }],
  //rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true }], // Updated to reference Room model
  transactionId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
}, { timestamps: true });

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;

/*import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true }], // ✅ Store room ObjectIds
    transactionId: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
*/