import mongoose from 'mongoose';
const Schema = mongoose.Schema

const contactSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    text: { type: String, required: true}

}, { timestamps: true, toJSON: { virtuals: true } })

export default mongoose.model('Contact', contactSchema)