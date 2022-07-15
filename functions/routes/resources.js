const express=require('express'),
    router=express.Router(),
    auth=require('../middlewares/auth'),
    authentication=require('../middlewares/authentication')

//public resource
router.get('/resource1',(req,res)=>{
    res.send('access granted')
})

// resource that can only be access with p1 permission
router.get('/resource2',auth,authentication({permssions:["p1"]}),(req,res)=>{
    res.send('access granted')
})



// resource that can be access with p1 and p2 permissions
router.get('/resource2',auth,authentication({permssions:['p1','p2']}),(req,res)=>{
    res.send('access granted')
})

















module.exports = router;