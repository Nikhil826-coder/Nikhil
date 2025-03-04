/*import express from "express";
import {login,register} from "../controllers/auth.js";
 

const router = express.Router();

router.post("/register", register)
router.post("/login", login) 

export default router*/

import express from "express";
import { register, login, logout, forgotPassword, resetPassword} from "../controllers/auth.js";
 
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout); // Logout Route
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);



export default router;
