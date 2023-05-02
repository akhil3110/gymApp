const express = require("express")
const mastersController = require("../controller/mastersController")
const uploader = require(".././middleware/uploader")
const router = express.Router()

router
  .post("/", mastersController.storemasters)
  .get("/", mastersController.getmastersById)
  .get("/list", mastersController.getmastersList)
  .put("/", mastersController.updatemastersByID)
  .delete("/", mastersController.deletemastersById)
  .post("/bulkInsert", uploader.single("fileCSV"), mastersController.insertBulkmasters)
  .post("/bulkUpdate", uploader.single("fileCSV"),mastersController.updateBulkmasters)

module.exports = router




