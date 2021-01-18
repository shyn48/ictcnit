import mongoose from 'mongoose'
import Service from './Service.js'

const helpSchema = mongoose.Schema(
  {
    name: { type: String, required: true},
    text: { type: String, required: true},
    forWho: [{ type: String, default: 'general' }]
  }, { timestamps: true, toJSON: { virtuals: true } }
)

helpSchema.virtual('helpService', {
  ref: 'HelpService',
  localField: '_id',
  foreignField: 'helpId'
})

export default mongoose.model('Help', helpSchema)