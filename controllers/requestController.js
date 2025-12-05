import Request from "../models/Request.js";

export const request = {
  sendRequest: async (req, res) => {
    try {
      const { senderId, receiverId } = req.body;

      if (senderId === receiverId) {
        return res
          .status(400)
          .json({ message: "You cannot send request to yourself" });
      }

      // Check if already exists
      const existing = await Request.findOne({
        sender: senderId,
        receiver: receiverId,
      });

      if (existing) {
        return res.status(400).json({ message: "Request already sent" });
      }

      const request = await Request.create({
        sender: senderId,
        receiver: receiverId,
      });

      return res.status(200).json({
        success: true,
        message: "Request sent successfully",
        request,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  acceptRequest: async (req, res) => {
    try {
      const { requestId } = req.body;

      const request = await Request.findById(requestId);

      if (!request)
        return res.status(404).json({ message: "Request not found" });

      request.status = "accepted";
      await request.save();

      return res
        .status(200)
        .json({ success: true, message: "Request accepted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  rejectRequest: async (req, res) => {
    try {
      const { requestId } = req.body;

      const request = await Request.findById(requestId);
      if (!request)
        return res.status(404).json({ message: "Request not found" });

      request.status = "rejected";
      await request.save();

      return res
        .status(200)
        .json({ success: true, message: "Request rejected" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getReceivedRequests: async (req, res) => {
    try {
      const { id } = req.params;

      const requests = await Request.find({
        receiver: id,
        status: "pending",
      })
        .populate("sender", "username fullName")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: requests.length,
        requests,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
