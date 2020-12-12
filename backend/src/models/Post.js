import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        title: { type: String, required: true},
        description: { type: String, required: true},
        text: { type: String, required: true},
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]

    },
    { timestamps: true, toJSON: { virtual: true }, discriminationKey: 'type'}
)

postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
})

export default mongoose.model('Post', postSchema)