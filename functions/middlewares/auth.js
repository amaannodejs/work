const User = require('../models/users'),
    Role=require('../models/roles')
module.exports = async (req, res, next) => {
    try {
        const {
            authToken
        } = req.body
        if (!authToken) {
            const err = new Error("Auth failed")
            err.status = 401
            throw err
        }
        const user=await User.verifyToken(authToken)
        req.user=user
        const permissions=[]
        for(let role in user.roles){
            permissions.push(await Role.getPermissions(role))
        }
        req.user.permissions=permissions
        next()
    } catch (err) {
        throw err
    }


}