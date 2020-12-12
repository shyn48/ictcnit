import mongoose from 'mongoose';
const Schema = mongoose.Schema

const careerSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    jobField: { type: String, required: true},
    description: { type: String, required: true}

}, { timestamps: true, toJSON: { virtuals: true } })

export default mongoose.model('Career', careerSchema)