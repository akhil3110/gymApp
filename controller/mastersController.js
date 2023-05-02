const { set } = require("mongoose")
const masters = require("../models/mastersModel")

const getmastersList = async (req, res, next) => {
  try {
    let data = await masters.find()
    res.status(200).json({ data })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

const updatemastersByID = async (req, res, next) => {
  try {
    let id = req.query.id
    let updateData = req.body
    const updatedData = await masters.findByIdAndUpdate(id, { $set: updateData })
    res.status(200).json({ messgae: "masters updated" })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

const getmastersById = async (req, res, next) => {
  try {
    let id = req.query.id
    let data = await masters.findById(id)
    res.status(200).json({ data })
  } catch (err) {
    res.status(400).json({ messgae: err.message })
  }
}

const deletemastersById = async (req, res, next) => {
  try {
    let id = req.query.id
    const updatedData = await masters.findByIdAndRemove(id)
    res.status(200).json({ messgae: "masters deleted" })
  } catch (err) {
    res.status(400).json({ messgae: err.message })
  }
}

const storemasters = async (req, res, next) => {
  try {
    let newModel = new masters(req.body)
    const data = await newModel.save()
    res.status(200).json({ data })
  } catch (err) {
    res.status(400).json({ messgae: err.message })
  }
}


const updateBulkmasters = async (req, res, next) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then(async (data) => {
        for (var x = 0; x < data.length; x++) {
          const id = data[x].id
          delete data[x].id
          await masters.findByIdAndUpdate(id, { $set: data[x] })
        }
      })
    res.status(200).json({ message: "Bulk Update Done" })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

const insertBulkmasters = async (req, res, next) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then(async (data) => {
        for (var x = 0; x < data.length; x++) {
          console.log(data[x])
          let newModel = new masters(data[x])
          await newModel.save()
        }
      })
    res.status(200).json({ message: "Bulk Insert Done" })
  } catch (error) {
    res.status(400).json({ messgae: "An error Occoured" })
  }
}

module.exports = {
  getmastersList,
  storemasters,
  getmastersById,
  deletemastersById,
  updatemastersByID,
  updateBulkmasters,
  insertBulkmasters
}
