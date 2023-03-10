import express from "express";
import { loginUser } from "../controller/loginUser";
import { registerUser } from "../controller/registerUser";
const router = express.Router();

router.get("/register", registerUser);
router.get("/login", loginUser);

module.exports = router;
