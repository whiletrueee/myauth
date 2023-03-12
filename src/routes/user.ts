import express from "express";
import { loginUser } from "../controller/loginUser";
import { me } from "../controller/me";
import { registerUser } from "../controller/registerUser";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", me);

module.exports = router;
