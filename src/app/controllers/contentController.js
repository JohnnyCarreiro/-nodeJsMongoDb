import { Router } from 'express'
import { model } from 'mongoose'
import authMiddleware from '../middlewares/auth'
import '../models/content'
import '../models/characteristics'

const Content = model('Content')
const Characteristics = model('Characteristics')

const router = Router()

router.use(authMiddleware)

router.get('/', async (req,res)=>{
    try{
        const contents = await Content.find().populate('user characteristics', 'name mercado tipo risco rentabilidade liquidez prazos valores user')
        return res.send({ contents })
    }catch(err){
        return res.status(400).send({ error: ' Error on loading contents ' })
    }
})
router.get('/:contentId', async(req,res)=>{
    try{
        const content = await Content.findById(req.params.contentId).populate('user characteristics', 'name mercado tipo risco rentabilidade liquidez prazos valores user')
        return res.send({ content })
    }catch(err){
        return res.status(400).send({ error: ' Error on loading content ' })
    }
})
router.post('/register', async (req,res)=>{
    const {title, description, text,characteristics } = req.body
    const user = req.userId
    const{mercado, tipo, risco, rentabilidade, liquidez, prazos, valores} = characteristics

    try{
        const content = await Content.create({title,description,text,user})
       try{
           const characteristic =  await Characteristics.create({
            mercado, tipo, risco, rentabilidade, liquidez, prazos, valores, user, content: content._id
           })
           await Content.findByIdAndUpdate(content._id,{
               '$set':{
                characteristics:characteristic
               }
               
            },{ new:true })

           await content.save()

       return res.send({ content })
       }catch(err){
        return res.status(400).send({ error: ' Error creating new characteristic ', err})
       }
         
    }catch(err){
        return res.status(400).send({ error: ' Error creating new content ', err})
    }
})
router.put('/:contentId', async (req,res)=>{
    
    const {title, description, text,characteristics } = req.body
    const{mercado, tipo, risco, rentabilidade, liquidez, prazos, valores} = characteristics

    try{
        const content = await Content.findByIdAndUpdate(req.params.contentId,{
            title,
            description,
            text
        },{new:true})
       
        await Characteristics.deleteOne({ content: content._id })
       try{
           const characteristic =  await Characteristics.create({
            mercado, tipo, risco, rentabilidade, liquidez, prazos, valores, content: content._id
           })
           await Content.findByIdAndUpdate(req.params.contentId,{
               '$set':{
                characteristics:characteristic._id
               }
            }, { new:true })

           await content.save()

       return res.send({ content })
       }catch(err){
        return res.status(400).send({ error: ' Error on updating characteristic ', err})
       }
         
    }catch(err){
        return res.status(400).send({ error: ' Error on updating content ', err})
    }
})
router.delete('/:contentId', async (req,res)=>{
    try{
        await Content.findByIdAndRemove(req.params.contentId)
        return res.status(200).send({ ok:true })
    }catch(err){
        return res.status(400).send({ error: ' Error on deleting content ' })
    }
})

 export default app => app.use('/content',router)