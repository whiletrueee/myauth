import express from "express";
import {loginUser, me, registerUser } from "../controller/user";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", me);
router.get("/hello", (req, res) => res.send("Hello World!"));

module.exports = router;
