import {connect} from 'mongoose'

// set('useCreateIndex', true);
connect('mongodb://localhost:27017/nodeapiauth',{useNewUrlParser:true,useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false})