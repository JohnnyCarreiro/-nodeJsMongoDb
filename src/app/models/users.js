import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

import '../../database/index'

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    passwordResetToken:{
        type: String,
        select: false,
    },
    passwordResetExpires:{
        type: Date,
        select: false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})
userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash

    next()
})
model('User', userSchema)