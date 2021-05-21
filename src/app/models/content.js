import {Schema, model} from 'mongoose'


import '../../database/index'

const contentSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    characteristics:{
        type: Schema.Types.ObjectId,
        ref:'Characteristics',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})

model('Content', contentSchema)
