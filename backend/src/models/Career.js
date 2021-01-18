import mongoose from 'mongoose';
const Schema = mongoose.Schema

const careerSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    age: { type: Number, required: true},
    resumeFile: { type: String},
    interests: [{ type: String, required: true}],
    text: { type: String}

}, { timestamps: true, toJSON: { virtuals: true } })

export default mongoose.model('Career', careerSchema)