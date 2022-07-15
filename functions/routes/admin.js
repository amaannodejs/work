const express=require('express'),
    router=express.Router(),
    adminController=require('../controllers/admin')

//post
router.post('/createUser',adminController.postCreateUser)
router.post('/createRole',adminController.postCreateRole)
router.post('/createPermission',adminController.postCreatePermission)
router.post('/assignRoles',adminController.postAssignRoles)
router.post('/assignPermissions',adminController.postAssignPermissions)
//get

router.get('/getAllUsers',adminController.getAllUsers)
router.get('/getAllRoles',adminController.getAllRoles)
router.get('/getAllPermissions',adminController.getAllPermissions)
















module.exports = router;