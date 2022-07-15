const {
    db
} = require('../firebase-config')


class Permission {
    constructor(permissionName) {
        this.permissionName = permissionName
    }
    async save() {
        try {
            await db.collection('Permissions').doc(`/${Date.now()}/`).create({
                id: Date.now(),
                permissionName: this.permissionName
            })
            return true
        } catch (err) {
            throw err
        }

    }
    static async creatPermission({
        permissionName
    }) {
        try {

            if (!permissionName) {
                const err = new Error("Feilds required!")
                err.status = 500
                throw err
            }
            const permission = new Permission(permissionName)
            return await permission.save()


        } catch (err) {
            throw err
        }

    }

    static async verfyPermissions(permissions) {
        try {
            const snap = await db.collection('Permissions').get()
            const verifiedPermissions = []

            snap.forEach(doc => verifiedPermissions.push(doc.data().permissionName))
            for (let permission of permissions) {
                if (!verifiedPermissions.includes(permission)) {
                    return false
                }
            }
            return true
        } catch (err) {
            throw err
        }

    }
    static async getAllPermissions() {
        try {
            const snap = await db.collection('Permissions').get()
            const permissions = []
            snap.forEach(doc => permissions.push(doc.data()))
            return permissions
        } catch (err) {
            throw err
        }
    }

}


module.exports = Permission