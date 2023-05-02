const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator= require("./validator")


const chatsSchema = new Schema( {

    sender : {    type :    String ,   require : [true,"sender is required " ],     },

    text : {    type :    String ,   require : [true,"text is required " ],     },timestamp : {    type :    String ,   require : [true,"timestamp is required " ],     },pinned : {    type :    String ,   require : [true,"pinned is required " ],     },created_by : {    type : Schema.Types.ObjectId  ,  ref : 'users',      }, 
    

  },  {timestamps:true}
  )

module.exports = mongoose.model("chats", chatsSchema );