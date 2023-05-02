const express = require("express")
const chatsController = require("../controller/chatsController")
const uploader = require(".././middleware/uploader")
const router = express.Router()

router
  .post("/", chatsController.storechats)
  .get("/", chatsController.getchatsById)
  .get("/list", chatsController.getchatsList)
  .put("/", chatsController.updatechatsByID)
  .delete("/", chatsController.deletechatsById)
  .post("/bulkInsert", uploader.single("fileCSV"), chatsController.insertBulkchats)
  .post("/bulkUpdate", uploader.single("fileCSV"),chatsController.updateBulkchats)

module.exports = router




