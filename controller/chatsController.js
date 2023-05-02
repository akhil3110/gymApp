const { set } = require("mongoose")
const chats = require("../models/chatsModel")

const getchatsList = async (req, res, next) => {
  try {
    let data = await chats.find()
    res.status(200).json({ data })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

const updatechatsByID = async (req, res, next) => {
  try {
    let id = req.query.id
    let updateData = req.body
    const updatedData = await chats.findByIdAndUpdate(id, { $set: updateData })
    res.status(200).json({ messgae: "chats updated" })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

const getchatsById = async (req, res, next) => {
  try {
    let id = req.query.id
    let data = await chats.findById(id)
    res.status(200).json({ data })
  } catch (err) {
    res.status(400).json({ messgae: err.message })
  }
}

const deletechatsById = async (req, res, next) => {
  try {
    let id = req.query.id
    const updatedData = await chats.findByIdAndRemove(id)
    res.status(200).json({ messgae: "chats deleted" })
  } catch (err) {
    res.status(400).json({ messgae: err.message })
  }
}

const storechats = async (req, res, next) => {
  try {
    let newModel = new chats(req.body)
    const data = await newModel.save()
    res.status(200).json({ data })
  } catch (err) {
    res.status(400).json({ messgae: err.message })
  }
}


const updateBulkchats = async (req, res, next) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then(async (data) => {
        for (var x = 0; x < data.length; x++) {
          const id = data[x].id
          delete data[x].id
          await chats.findByIdAndUpdate(id, { $set: data[x] })
        }
      })
    res.status(200).json({ message: "Bulk Update Done" })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

const insertBulkchats = async (req, res, next) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then(async (data) => {
        for (var x = 0; x < data.length; x++) {
          console.log(data[x])
          let newModel = new chats(data[x])
          await newModel.save()
        }
      })
    res.status(200).json({ message: "Bulk Insert Done" })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

module.exports = {
  getchatsList,
  storechats,
  getchatsById,
  deletechatsById,
  updatechatsByID,
  updateBulkchats,
  insertBulkchats
}
