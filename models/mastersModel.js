const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator= require("./validator")


const mastersSchema = new Schema( {

    type : {    type :    String ,   require : [true,"type is required " ],     },

    value : {    type :    String ,   require : [true,"value is required " ],     },created_by : {    type : Schema.Types.ObjectId  ,  ref : 'users',      }, 
    

  },  {timestamps:true}
  )

module.exports = mongoose.model("masters", mastersSchema );