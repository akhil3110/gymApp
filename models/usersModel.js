const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator= require("./validator")


const usersSchema = new Schema( {

    name : {    type :    String ,   require : [true,"name is required " ],     },

    email : {    type :    String ,   require : [true,"email is required " ],    unique :true,    validate :{ validator : (v) => validator.emailValidator(v), message: props => `${props.value} is not a valid `},},password : {    type :    String ,   require : [true,"password is required " ],     }, 
    

  },  {timestamps:true}
  )

module.exports = mongoose.model("users", usersSchema );