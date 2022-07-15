require('dotenv').config()
const {functions,admin}=require('./firebase-config'),
      express=require('express'),
      cors=require('cors'),
      app=express(),
      adminRoutes=require('./routes/admin'),
      authRoutes=require('./routes/auth'),
      resourcesRoute=require('./routes/resources');
      

app.use(cors({origin:true}))


//routes
app.use('/admin',adminRoutes)
app.use('/auth',authRoutes)
// app.use('/resources',resourcesRoute)





app.use((err,req,res,next)=>{
    if (!err.status) {
        err.status = 500
    }
    //console.log(err)
    return res.status(err.status).json({
        "error": String(err)
    })

})






//testing
//database check
// const User=require('./models/users')
// const Amaan=new User('amaan@jkdv.d',"adfasf",'Amaan',['Admin'])
// console.log(Amaan.save())



exports.app=functions.https.onRequest(app);