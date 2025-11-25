import express from "express";
import { profile } from "../controllers/profileController.js";

const router = express.Router();

router.put("/update-profile", profile.updateProfile);
router.delete("/delete-profile/:id", profile.deleteProfile);

export default router;
