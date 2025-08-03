const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addTask,
  editTask,
  getTask,
  deleteTask,
  userDetails,
} = require("../controllers/task.controller");

router.post("/addtask", authMiddleware, addTask);
router.put("/editask/:id", authMiddleware, editTask);
router.get("/gettask/:id", authMiddleware, getTask);
router.delete("/deletetask/:id", authMiddleware, deleteTask);
router.get("/allnotes", authMiddleware, userDetails);

module.exports = router;
