const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator= require("./validator")


const tasksSchema = new Schema( {

    task : {    type :    String ,   require : [true,"task is required " ],     },

    status : {    type :    String ,   require : [true,"status is required " ],     },type : {    type : Schema.Types.ObjectId  ,  ref : 'masters',   require : [true,"type is required " ],     },created_by : {    type : Schema.Types.ObjectId  ,  ref : 'users',      }, 
    

  },  {timestamps:true}
  )

module.exports = mongoose.model("tasks", tasksSchema );