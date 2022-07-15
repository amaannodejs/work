const functions = require("firebase-functions"),
      admin=require('firebase-admin'),
      serviceAccount = require("../credentials/serviceAccountKey.json")








admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db=admin.firestore();



module.exports={functions,admin,serviceAccount,db}