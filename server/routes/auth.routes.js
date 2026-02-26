import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();


//register route
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
  ],
  validate,
  registerUser
);

//login route

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required")
  ],
  validate,
  loginUser
);

//logout route

router.post("/logout", logoutUser);

export default router;