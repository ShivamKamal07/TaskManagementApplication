import express from "express";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "protected route accessed",
    user: req.user
  });
});

export default router;