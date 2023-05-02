const express = require("express")
const tasksController = require("../controller/tasksController")
const uploader = require(".././middleware/uploader")
const router = express.Router()

router
  .post("/", tasksController.storetasks)
  .get("/", tasksController.gettasksById)
  .get("/list", tasksController.gettasksList)
  .put("/", tasksController.updatetasksByID)
  .delete("/", tasksController.deletetasksById)
  .post("/bulkInsert", uploader.single("fileCSV"), tasksController.insertBulktasks)
  .post("/bulkUpdate", uploader.single("fileCSV"),tasksController.updateBulktasks)

module.exports = router




