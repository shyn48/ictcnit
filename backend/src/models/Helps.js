import mongoose, { Schema } from 'mongoose'
import Post from './Post.js'

const helpPost = Post.discriminator('Help', new mongoose.Schema({
    system: {type: String, required: true},
    forServices: [{type: Schema.Types.ObjectId, ref: 'Service' ,required: true}],
    forUsers: [{type: Schema.Types.ObjectId, ref: 'User', required: true}]
  })
)

export default mongoose.model('Help', helpPost)