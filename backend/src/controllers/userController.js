import controller from './controller.js'
import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'
import validator from 'validator'

class userController  {

    // @desc    Auth user & get token (login)
    // @route   POST /api/users/login
    // @access  Public
    authUser = asyncHandler(async(req,res) => {
        const { name, email, password } = req.body
        
        const user = await User.findOne({ email })
        
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(401)
            throw new Error('ایمیل یا پسورد شما اشتباه است')
        }

    })


    // @desc    Register a new user
    // @route   POST /api/users/create
    // @access  Public
    registerUser = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body

        if (!validator.isEmail(email)) {
            res.status(400)
            throw new Error('ایمیل شما معتبر نیست')
        }

        const userExists = await User.findOne({ email })

        if(userExists) {
            res.status(400)
            throw new Error('چنین کاربری قبلا ثبت نام کرده است')
        }

        

        const user = await User.create({
            name, email, password
        })

        const token = (generateToken(user._id))

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: token
            })
        } else {
            res.status(400)
            throw new Error('اطلاعات معتبر نیست')
        }
    })

    // @desc    Get user profile
    // @route   GET /api/users/profile
    // @access  Private

    getUserProfile = asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id)
      
        if (user) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          })
        } else {
          res.status(404)
          throw new Error('چنین کاربری یافت نشد')
        }


    })

    // @desc    Update user profile
    // @route   PUT /api/users/profile
    // @access  Private

    updateUserProfile = asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id)
      
        if (user) {
          user.name = req.body.name || user.name
          user.email = req.body.email || user.email
          if (req.body.password) {
            user.password = req.body.password
          }
      
          const updatedUser = await user.save()
      
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
          })
        } else {
          res.status(404)
          throw new Error('چنین کاربری یافت نشد')
        }
    })

    // @desc    Delete user
    // @route   DELETE /api/users/:id
    // @access  Private/Admin

    deleteUser = asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id)

        if (user) {
            await user.remove()
            res.json({ message: 'کاربر حذف شد' })
        } else {
            res.status(404)
            throw new Error('چنین کاربری یافت نشد')
        }

    })

    // @desc    Get user by ID
    // @route   GET /api/users/:id
    // @access  Private/Admin
    getUserById = asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id).select('-password')
    
        if (user) {
        res.json(user)
        } else {
        res.status(404)
        throw new Error('User not found')
        }
    })

    // @desc    Update user
    // @route   PUT /api/users/:id
    // @access  Private/Admin
    updateUser = asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id)
    
        if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
    
        const updatedUser = await user.save()
    
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
        } else {
        res.status(404)
        throw new Error('User not found')
        }
    })
    
}

export default new userController()