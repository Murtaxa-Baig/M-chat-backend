import express from "express";
import { auth } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/search", auth.searchUsers);

export default router;
