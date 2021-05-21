import {Schema, model} from 'mongoose'


import '../../database/index'

const characteristicsSchema = new Schema({
    mercado:{
        type:String,
        required:true,
    },
    tipo:{
        type:String,
        required:true,
    },
    risco:{
        type:String,
        required:true,
    },
    rentabilidade:{
        type:String,
        required:true,
    },
    liquidez:{
        type:String,
        required:true,
    },
    prazos:{
        type:String,
        required:true,
    },
    valores:{
        type:String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        Required:true,
    },
    content:{
        type: Schema.Types.ObjectId,
        ref:'Content',
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})

model('Characteristics', characteristicsSchema)