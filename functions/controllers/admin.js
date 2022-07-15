const User = require('../models/users'),
    Role = require('../models/roles'),
    Permission = require('../models/permissions')


exports.postCreateUser = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            roles
        } = req.body
        await User.createUser({
            name: name,
            email: email,
            password: password,
            roles: roles
        })
        return res.status(200).json({
            status: "user created successfully"
        })
    } catch (err) {
        next(err)
    }


}


exports.postCreateRole = async (req, res, next) => {
    try {
        const {
            roleName,
            permissions
        } = req.body


        await Role.creatRole({
            roleName: roleName,
            permissions: permissions
        })
        return res.status(200).json({
            "status": "Role created successfully"
        })
    } catch (err) {
        next(err)
    }

}


exports.postCreatePermission = async (req, res, next) => {
    try {
        const {
            permissionName
        } = req.body
        await Permission.creatPermission({
            permissionName: permissionName
        })
        return res.status(200).json({
            "status": "Permission created successfully"
        })

    } catch (err) {
        next(err)
    }
}


exports.postAssignRoles = async (req, res, next) => {
    try {
        const {
            userId,
            roles
        } = req.body
        await User.assignRoles({
            userId: userId,
            roles: roles
        })
        return res.status(200).json({
            "status": "Roles assigned successfully"
        })

    } catch (err) {
        next(err)
    }
}
exports.postAssignPermissions = async (req, res, next) => {
    try {
        const {
            roleName,
            permissions
        } = req.body
        await Role.assignPermissions({
            roleName: roleName,
            permissions: permissions
        })
        return res.status(200).json({
            "status": "Permissions assigned successfully"
        })

    } catch (err) {
        next(err)
    }
}
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.getAllUsers()
        return res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}
exports.getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.getAllRoles()
        return res.status(200).json(roles)
    } catch (err) {
        next(err)
    }
}
exports.getAllPermissions = async (req, res, next) => {
    try {
        const permissions = await Permission.getAllPermissions()
        return res.status(200).json(permissions)
    } catch (err) {
        next(err)
    }
}