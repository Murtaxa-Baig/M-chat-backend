import User from "../models/User.js";

export const profile = {
  updateProfile: async (req, res) => {
    try {
      const { fullName, id } = req.body;

      // Validation
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }

      if (!fullName || fullName.trim().length < 3) {
        return res.status(400).json({
          message: "Please enter a valid name",
        });
      }

      // Update user in Users collection
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { fullName: fullName.trim() },
        { new: true } // return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Unable to update name" });
      }

      return res.status(200).json({
        sucess: true,
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  deleteProfile: async (req, res) => {
    console.log("function called");
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const some = await User.findByIdAndDelete(id);
      console.log("some===========", some);

      return res.status(200).json({
        success: true,
        message: "User and Profile Deleted Successfully.",
      });
    } catch (error) {
      console.log("error from backend", error);

      return res.status(500).json({
        message: error.message,
      });
    }
  },
};
