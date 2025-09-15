import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../middlewares/validation/auth.validation.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post("/register", validateRegister, validateRequest, registerUser);
router.post("/login", validateLogin, validateRequest, loginUser);

export default router;
