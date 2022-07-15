const {
    HttpsError
} = require('firebase-functions/v1/auth');
const {
    db
} = require('../firebase-config'),
    Role = require('./roles'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    jwtkey = process.env.jwtkey

class User {
    constructor(email, password, name, roles) {
        this.email = email
        this.password = password
        this.name = name
        this.roles = roles
    }
    async save() {
        try {
            await db.collection('Users').doc(`/${Date.now()}/`).create({
                id: Date.now(),
                name: this.name,
                password: this.password,
                email: this.email,
                roles: this.roles
            })
            return true
        } catch (err) {
            throw err
        }

    }
    static async createUser({
        name,
        email,
        password,
        roles = ['guser']
    }) {
        try {
            if (!name || !email || !password) {
                const err = new Error("Feilds required!")
                err.status = 500
                throw err
            }
            const hash = await bcrypt.hash(password, 12)
            const user = new User(email, hash, name, roles)
            return await user.save()
        } catch (err) {
            throw err
        }

    }
    static async findUserById(userId) {
        try {
            const user = await db.collection('Users').doc(userId).get()
            return user.data()
        } catch (err) {
            throw err
        }

    }
    static async updateUser(userId, email, name, password, roles) {
        try {
            //console.log(userId,"USERID")
            const res = await db.collection('Users').doc(String(userId)).set({
                name: name,
                password: password,
                email: email,
                roles: roles,
                id: userId
            })
            return Boolean(res)
        } catch (err) {
            throw err
        }

    }
    static async assignRoles({
        userId,
        roles
    }) {
        try {
            if (!roles || roles.length == 0) {
                const err = new Error("Feilds required!")
                err.status = 500
                throw err
            }
            const user = await User.findUserById(userId)
            if (!user) {
                const err = new Error("Invalid UserId")
                err.status = 500
                throw err
            }
            console.log(user)
            if (!await Role.verifyRoles(roles)) {
                const err = new Error("Roles does not exist")
                err.status = 500
                throw err
            }
            for (let role of roles) {
                if (!user.roles.includes(role)) {
                    user.roles.push(role)
                }
            }
            return await User.updateUser(user.id, user.email, user.name, user.password, user.roles)


        } catch (err) {
            throw err
        }
    }
    static async getAllUsers() {
        try {
            const snap = await db.collection('Users').get()
            const users = []
            snap.forEach(doc => users.push(doc.data()))
            return users
        } catch (err) {
            throw err
        }
    }

    static async login({
        email,
        password
    }) {
        try {
            const snap = await db.collection('Users').where('email', '==', email).get(),
                userar = []
            snap.forEach(doc => userar.push(doc.data()))
            const user = userar[0],
                result = await bcrypt.compare(password, user.password)
            if (!result) {
                const err = new Error("Invaild username or password")
                err.status = 401
                throw err
            }

            return jwt.sign({
                userId: user.id,
                email: user.email,
                password: user.password,
                roles: user.roles
            }, jwtkey)
        } catch (err) {
            throw err
        }

    }
    static async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, jwtkey)
            const snap = await db.collection('Users').where('email', '==', email).get(),
                userar = []
            snap.forEach(doc => userar.push(doc.data()))
            const user = userar[0]
            if(!user){
                const err = new Error("Invaild token")
                err.status = 401
                throw err
            }
            return user
        } catch (err) {
            err.status = 401
            throw err
        }

    }

}


module.exports = User