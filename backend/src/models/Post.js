import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        title: { type: String, required: true},
        description: { type: String, required: true},
        text: { type: String, required: true},
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
        //categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false }]

    },
    { timestamps: true, toJSON: { virtuals: true }, discriminationKey: 'type'}
)

postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
})

export default mongoose.model('Post', postSchema)