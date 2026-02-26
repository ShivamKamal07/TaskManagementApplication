import express from "express";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { body, param } from "express-validator";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

//validation for Create Task Route

router.post(
  "/",
  protect,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("status")
      .optional()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Invalid status")
  ],
  validate,
  createTask
);

// gettask route 

router.get("/", protect, getTasks);

//update task route

router.put(
  "/:id",
  protect,
  [
    param("id").isMongoId().withMessage("Invalid task ID"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("status")
      .optional()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Invalid status")
  ],
  validate,
  updateTask
);

//task delete route 
router.delete("/:id", protect, deleteTask);

export default router;
