import express from 'express'
import bodyParser from 'body-parser'
// import routes from './routers/routes2'


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//routes
// app.use('/auth',routes)
app.get('/', (req,res)=> {
    res.send(`Server is running... On port ${port}`)
})
import contentController from './app/controllers/contentController'
contentController(app)

import authController from './app/controllers/authController'
authController(app)

//See how to use a routes in controllers folder to import all controller at once 
// import routesController from './app/controllers/routes'
// routesController(app)


const port = 3030

app.listen(port,()=>{
    console.log(`Server Started on port ${port}`)
})