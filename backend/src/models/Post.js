import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        title: { type: String, required: true},
        description: { type: String, required: true},
        text: { type: String, required: true},
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
        imgURL: { type: String },
        categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false, default: 'اخبار' }]

    },
    { timestamps: true, toJSON: { virtuals: true }}
)

postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
})

export default mongoose.model('Post', postSchema)