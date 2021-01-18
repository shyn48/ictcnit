import mongoose from 'mongoose'
const Schema = mongoose.Schema

const helpServiceSchema = Schema(
    {
        serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true},
        helpId: { type: Schema.Types.ObjectId, ref: 'Help', required: true}
    }
)

export default mongoose.model('HelpService', helpServiceSchema)