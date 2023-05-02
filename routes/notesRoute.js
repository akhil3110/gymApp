const express = require("express")
const notesController = require("../controller/notesController")
const uploader = require(".././middleware/uploader")
const router = express.Router()

router
  .post("/", notesController.storenotes)
  .get("/", notesController.getnotesById)
  .get("/list", notesController.getnotesList)
  .put("/", notesController.updatenotesByID)
  .delete("/", notesController.deletenotesById)
  .post("/bulkInsert", uploader.single("fileCSV"), notesController.insertBulknotes)
  .post("/bulkUpdate", uploader.single("fileCSV"),notesController.updateBulknotes)

module.exports = router




