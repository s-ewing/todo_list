const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const verifyJwt = require("../middleware/verifyJWT");

router.route("/").get(verifyJwt, taskController.getTasksByUserId);
router.route("/").post(verifyJwt, taskController.createNewTask);
router.route("/:taskId").put(verifyJwt, taskController.updateTask);
router.route("/:taskId").delete(verifyJwt, taskController.deleteTask);

module.exports = router;