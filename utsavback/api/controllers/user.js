import User from "../models/User.js";


//UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  };
  
  //DELETEUSER
  export const deleteUser = async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User has been deleted." });
    } catch (err) {
      next(err);
    }
  };
  
 // GETUSER
  export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return next(createError(404, "User not found!"));
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
  
  //GETALL USERS
  export const getUsers = async (req, res, next) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };
  