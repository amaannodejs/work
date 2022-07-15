const User = require('../models/users')
exports.login = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body
        token = await User.login({
            email: email,
            password: password
        })
        return res.status(200).json({
            authToken:token
        })
    } catch (err) {
        next(err)
    }


}
// exports.register=async(req,res,next)=>{
//     const {name,email,password,confirmPassword}=req.body
//     User.createUser
// }