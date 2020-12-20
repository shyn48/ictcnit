import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const userSchema = mongoose.Schema(
    {
        name : { type: String, required: true},
        email: { type: String, required: true, unique: true, trim: true, lowercase: true},
        password: { type: String, required: true},
        isAdmin: { type: Boolean, default: false},
        //roles: []

    },
    { timestamps: true, toJSON: { virtuals: true } }
)

userSchema.methods.hashPassword = function (password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)

    return hash
}

userSchema.methods.matchPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

userSchema.pre('save', async function (next){
    if (!this.isModified('password')){
        next()
    }

    this.password = this.hashPassword(this.password)
})

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
})

const User = mongoose.model('User', userSchema)

export default User