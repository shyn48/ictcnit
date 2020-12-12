import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
        name : { type: String, required: true},
        email: { type: String, required: true, unique: true, trim: true, lowercase: true},
        password: { type: String, required: true},
        isAdmin: { type: Boolean, required: true, default: false},
        jwt: { type: String, required: true, default: null},
        //roles: []

    },
    { timestamps: true, toJSON: { virtuals: true } }
)

userSchema.methods.hashPassword = function (password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)

    return hash
}

userSchema.methods.comparePasswords = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User