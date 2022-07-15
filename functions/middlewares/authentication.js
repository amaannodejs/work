module.exports = async (req,res,next,{permissions})=>{
    try{
        if(!req.user){
            const err = new Error("Auth failed")
            err.status = 401
            throw err
        }
        
        for(let permission of permissions){
            if(req.user.permissions.include(permission)){
                return next()
            }

        }
        if(!req.user){
            const err = new Error("Athentication failed")
            err.status = 401
            throw err
        }
    }catch(err){

    }
}