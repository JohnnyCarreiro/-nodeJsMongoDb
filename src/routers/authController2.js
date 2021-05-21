import {model} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.json'
import '../app/models/users'

const User = model('User')

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn:86400,
    })
}

const authController = {
    async register(req,res){
        const { email } = req.body
        try{
            if(await User.findOne({ email }))
            return res.status(400).send({error:'User already exists'})

            const user = await User.create(req.body)

            user.password = undefined

            return res.send({
                user,
                token:generateToken({ id: user.id })
            })
        }catch(err){
            res.status(400).send({error:'Registration Failed'})
        }
    },
    async authenticate(req,res){
        const { email, password } = req.body
        const user = await User.findOne({ email }).select('+password')

        if(!user) return res.status(400).send({error:'User not found'})

        if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error:'Invalid Password' })

        user.password = undefined

        res.send({ 
            user,
            token: generateToken({ id: user.id }) 
        })
    }

}

export default authController