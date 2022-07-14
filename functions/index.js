const functions = require("firebase-functions"),
      admin=require('firebase-admin'),
      serviceAccount = require("../credentials/serviceAccountKey.json")
      express=require('express'),
      cors=require('cors'),
      app=express(),
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });

app.use(cors({origin:true}))


app.get('/',(req,res)=>{
    res.send('up')
})






exports.app=functions.https.onRequest(app);