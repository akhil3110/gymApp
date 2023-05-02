const { set } = require("mongoose")
const notes = require("../models/notesModel")

const getnotesList = async (req, res, next) => {
  try {
    let data = await notes.find()
    res.status(200).json({ data })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

const updatenotesByID = async (req, res, next) => {
  try {
    let id = req.query.id
    let updateData = req.body
    const updatedData = await notes.findByIdAndUpdate(id, { $set: updateData })
    res.status(200).json({ messgae: "notes updated" })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

const getnotesById = async (req, res, next) => {
  try {
    let id = req.query.id
    let data = await notes.findById(id)
    res.status(200).json({ data })
  } catch (err) {
    res.status(400).json({ messgae: err.message })
  }
}

const deletenotesById = async (req, res, next) => {
  try {
    let id = req.query.id
    const updatedData = await notes.findByIdAndRemove(id)
    res.status(200).json({ messgae: "notes deleted" })
  } catch (err) {
    res.status(400).json({ messgae: err.message })
  }
}

const storenotes = async (req, res, next) => {
  try {
    let newModel = new notes(req.body)
    const data = await newModel.save()
    res.status(200).json({ data })
  } catch (err) {
    res.status(400).json({ messgae: err.message })
  }
}


const updateBulknotes = async (req, res, next) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then(async (data) => {
        for (var x = 0; x < data.length; x++) {
          const id = data[x].id
          delete data[x].id
          await notes.findByIdAndUpdate(id, { $set: data[x] })
        }
      })
    res.status(200).json({ message: "Bulk Update Done" })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

const insertBulknotes = async (req, res, next) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then(async (data) => {
        for (var x = 0; x < data.length; x++) {
          console.log(data[x])
          let newModel = new notes(data[x])
          await newModel.save()
        }
      })
    res.status(200).json({ message: "Bulk Insert Done" })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

module.exports = {
  getnotesList,
  storenotes,
  getnotesById,
  deletenotesById,
  updatenotesByID,
  updateBulknotes,
  insertBulknotes
}
