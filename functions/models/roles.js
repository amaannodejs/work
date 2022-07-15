const {
    db
} = require('../firebase-config')
const Permission = require('./permissions')

class Role {
    constructor(roleName, permissions = []) {
        this.roleName = roleName
        this.permissions = permissions
    }
    async save() {
        try {
            await db.collection('Roles').doc(`/${Date.now()}/`).create({
                id: Date.now(),
                roleName: this.roleName,
                permissions: this.permissions
            })
            return true
        } catch (err) {
            throw err
        }

    }
    static async creatRole({
        roleName,
        permissions = ['p1']
    }) {
        try {

            if (!roleName) {
                const err = new Error("Feilds required!")
                err.status = 500
                throw err
            }
            const role = new Role(roleName, permissions)
            return await role.save()


        } catch (err) {
            throw err
        }

    }

    static async verifyRoles(roles) {
        try {
            const snap = await db.collection('Roles').get()
            const verifiedRoles = []

            snap.forEach(doc => verifiedRoles.push(doc.data().roleName))

            for (let role of roles) {
                if (!verifiedRoles.includes(role)) {
                    return false
                }

            }
            return true
        } catch (err) {
            throw err
        }

    }
    static async findRoleByRoleName(roleName) {
        try {
            const snap = await db.collection('Roles').where("roleName", "==", roleName).get()
            const role = []
            snap.forEach(doc => role.push(doc.data()))
            return role[0]
        } catch (err) {
            throw err
        }

    }

    static async updateRole(roleId, roleName, permissions) {
        try {
            const res = await db.collection('Roles').doc(String(roleId)).set({
                id: roleId,
                roleName: roleName,
                permissions: permissions
            })
            return Boolean(res)
        } catch (err) {
            throw err
        }
    }

    static async assignPermissions({
        roleName,
        permissions
    }) {
        try {
            if (!roleName || !permissions || permissions.length == 0) {
                const err = new Error("Feilds required!")
                err.status = 500
                throw err
            }
            if (!await this.verifyRoles([roleName])) {
                const err = new Error("Roles does not exist!")
                err.status = 500
                throw err
            }
            if (!await Permission.verfyPermissions(permissions)) {
                const err = new Error("Permissions does not exist!")
                err.status = 500
                throw err
            }
            const role = await this.findRoleByRoleName(roleName)
            for (let permission of permissions) {
                if (!role.permissions.includes(permission)) {
                    role.permissions.push(permission)
                }
            }
            console.log(role)

            return await this.updateRole(role.id, role.roleName, role.permissions)
        } catch (err) {
            throw err
        }
    }
    static async getAllRoles() {
        try {
            const snap = await db.collection('Roles').get()
            const roles = []
            snap.forEach(doc => roles.push(doc.data()))
            return roles
        } catch (err) {
            throw err
        }
    }
    async getPermissions(roleName) {
        try {
            role=await this.findRoleByRoleName(roleName)
            return role.permissions
        } catch (err) {
            throw err
        }
    }
}


module.exports = Role