import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    parent: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
    approved: { type: Boolean, default: false },
    post: { type: Schema.Types.ObjectId, ref: 'Post', default: undefined },
    text: { type: String, required: true},
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent'
})

export default mongoose.model('Comment', commentSchema);