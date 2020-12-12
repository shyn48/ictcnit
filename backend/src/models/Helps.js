import mongoose from 'mongoose'
import Post from './Post.js'

const helpPost = Post.discriminator('Help', new mongoose.Schema({
    system: {type: String, required: true},
  })
)

export default mongoose.model('Help', helpPost)