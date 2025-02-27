/*import express from "express";
import {login,register} from "../controllers/auth.js";
 

const router = express.Router();

router.post("/register", register)
router.post("/login", login) 

export default router*/

import express from "express";
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout); // Logout Route

export default router;
