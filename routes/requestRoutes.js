import express from "express";
import { request } from "../controllers/requestController.js";

const router = express.Router();

router.get("/get-received-requests", request.getReceivedRequests);
router.post("/send-request", request.sendRequest);
router.patch("/accept-request", request.acceptRequest);
router.patch("/reject-request", request.rejectRequest);

export default router;
