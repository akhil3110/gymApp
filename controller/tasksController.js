const { set } = require("mongoose")
const tasks = require("../models/tasksModel")

const gettasksList = async (req, res, next) => {
  try {
    let data = await tasks.find()
    res.status(200).json({ data })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

const updatetasksByID = async (req, res, next) => {
  try {
    let id = req.query.id
    let updateData = req.body
    const updatedData = await tasks.findByIdAndUpdate(id, { $set: updateData })
    res.status(200).json({ messgae: "tasks updated" })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

const gettasksById = async (req, res, next) => {
  try {
    let id = req.query.id
    let data = await tasks.findById(id)
    res.status(200).json({ data })
  } catch (err) {
    res.status(400).json({ messgae: err.message })
  }
}

const deletetasksById = async (req, res, next) => {
  try {
    let id = req.query.id
    const updatedData = await tasks.findByIdAndRemove(id)
    res.status(200).json({ messgae: "tasks deleted" })
  } catch (err) {
    res.status(400).json({ messgae: err.message })
  }
}

const storetasks = async (req, res, next) => {
  try {
    let newModel = new tasks(req.body)
    const data = await newModel.save()
    res.status(200).json({ data })
  } catch (err) {
    res.status(400).json({ messgae: err.message })
  }
}


const updateBulktasks = async (req, res, next) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then(async (data) => {
        for (var x = 0; x < data.length; x++) {
          const id = data[x].id
          delete data[x].id
          await tasks.findByIdAndUpdate(id, { $set: data[x] })
        }
      })
    res.status(200).json({ message: "Bulk Update Done" })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

const insertBulktasks = async (req, res, next) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then(async (data) => {
        for (var x = 0; x < data.length; x++) {
          console.log(data[x])
          let newModel = new tasks(data[x])
          await newModel.save()
        }
      })
    res.status(200).json({ message: "Bulk Insert Done" })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

module.exports = {
  gettasksList,
  storetasks,
  gettasksById,
  deletetasksById,
  updatetasksByID,
  updateBulktasks,
  insertBulktasks
}
