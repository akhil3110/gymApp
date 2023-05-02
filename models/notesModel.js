const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator= require("./validator")


const notesSchema = new Schema( {

    title : {    type :    String ,   require : [true,"title is required " ],     },

    created_by : {    type : Schema.Types.ObjectId  ,  ref : 'users',      }, 
    

  },  {timestamps:true}
  )

module.exports = mongoose.model("notes", notesSchema );