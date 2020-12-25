import asyncHandler from 'express-async-handler'
import Comment from '../models/Comment.js'
import Post from '../models/Post.js'
import validator from 'validator'

class postController {
    comment = asyncHandler(async (req, res) => {
        let status = this.validateComment(req);
        if (!status) throw new Error('invalid data')

        const user = req.user.id
        const { post, text } = req.body

        const comment = await Comment.create({
            user, post, text
        })

        if (comment) {
          res.status(201).json(comment)
        } else {
          res.status(400)
          throw new Error('اطلاعات نامعتبر است')
        }
    })

    validateComment(req) {
        let validationResult = [];
    
        if (!validator.isLength(req.body.text, { min: 10, max: undefined })) {
          validationResult.push('متن بدنه نمی‌تواند کمتر از 10 کاراکتر باشد');
        }
    
        if (validationResult.length == 0) {
          return true;
        } else {
          return false;
        }
    }

    fetchTopPosts = asyncHandler(async (req, res) => {
        const posts = await Post.find({}).sort({ date: 1 }).limit(6)

        res.json(posts)
    })
    
    fetchPosts = asyncHandler(async (req, res) => {
      const pageSize = 10
      const page = Number(req.query.pageNumber) || 1

      const keyword = req.query.keyword
        ? {
          name : {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
        : {}

        const count = await Post.countDocuments({ ...keyword })
        const posts = await Post.find({ ...keyword })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .populate([
            {
              path: 'comments',
              match: {
                parent: null,
                approved: true
              },
              populate: [
                {
                  path: 'user',
                  select: 'name'
                },
                {
                  path: 'replies',
                  match: {
                    approved: true
                  },
                  populate: { path: 'user', select: 'name'}
                }
              ]
            }
          ])
        res.json({ posts, page, pages: Math.ceil(count / pageSize) })
    })

    createPost = asyncHandler(async (req, res) => {

      let status = this.validatePostData(req);
      if (!status) throw new Error('invalid data')

      const { title, description, text } = req.body
      const user = req.user.id

      const post = new Post({ title, description, text, user})

      await post.save()

      if (post) {
        res.status(201).json(post)
      } else {
        res.status(401)
        throw new Error('اطلاعات معتبر نیست')
      }
    })

    updatePost = asyncHandler(async (req, res) => {
  
      let status = this.validatePostData(req);
      if (!status) throw new Error('invalid data')

      const { title, description, text } = req.body

      const post = await Post.findById(req.params.id)

      if (post) {
        post.title = title
        post.description = description
        post.text = text
        const updatedPost = await post.save()
        res.json(updatedPost)
      } else {
        res.status(404)
        throw new Error('Post not found')
      }

    })

    deletePost = asyncHandler(async (req, res) => {
      const post = await Post.findById(req.params.id)

      if (post) {
        await post.remove()
        res.json({ message: 'post removed' })
      } else {
        res.status(404)
        throw new Error('post not found')
      }

    })

    fetchSinglePost = asyncHandler(async (req, res) => {
      const post = await Post.findById(req.params.id)
      .populate([
        {
          path: 'comments',
          match: {
            parent: null,
            approved: true
          },
          populate: [
            {
              path: 'user',
              select: 'name'
            },
            {
              path: 'replies',
              match: {
                approved: true
              },
              populate: { path: 'user', select: 'name'}
            }
          ]
        },
        {
          path: 'author',
          select: { 'name': 1, 'email': 1 }
        }
      ])

      if (post) {
        res.json(post)
      } else {
        res.status(404)
        throw new Error('Post not found')
      }

    })

    validatePostData = (req) => {
      let validationResult = [];
    
      if (!validator.isLength(req.body.text, { min: 20, max: undefined })) {
        validationResult.push('متن بدنه نمی‌تواند کمتر از 20 کاراکتر باشد');
      }

      if (!validator.isLength(req.body.title, { min: 5, max: undefined })) {
        validationResult.push('متن عنوان نمی‌تواند کمتر از 5 کاراکتر باشد');
      }

      if (!validator.isLength(req.body.description, { min: 10, max: undefined })) {
        validationResult.push('متن توضیحات نمی‌تواند کمتر از 10 کاراکتر باشد');
      }
  
      if (validationResult.length == 0) {
        return true;
      } else {
        return false;
      }
    }
}

export default new postController()