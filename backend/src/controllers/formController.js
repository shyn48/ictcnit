import asyncHandler from 'express-async-handler'
import ContactRequest from '../models/ContactRequest.js'
import Career from '../models/Career.js'
import validator from 'validator'

class formController {
    fetchContacts = asyncHandler(async (req, res) => {
        const pageSize = 9
        const page = Number(req.query.pageNumber) || 1
  
          const count = await ContactRequest.countDocuments({})
          const contacts = await ContactRequest.find({})
            .populate([
              { 
                path: 'post'
              },
              {
                path: 'user'
              }
            ])
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1))

          res.json({ contacts, page, pages: Math.ceil(count / pageSize) })
    })

    deleteContact = asyncHandler(async (req, res) => {
        const { id } = req.body

        const contact = await ContactRequest.findById(id)
  
        if (contact) {
          contact.delete()
          res.json(contact)
        } else {
            throw new Error
        }
    })

    sendContactForm = async (req, res) => {
        const { name, email, text, interests } = req.body

        if (!validator.isEmail(email)) {
            res.status(400)
            throw new Error('ایمیل شما معتبر نیست')
        }

        const contact = await ContactRequest.create({
            name, email, text
        })

        if (contact) {
            res.status(201).json({
                name: contact.name,
                email: contact.email,
                text: contact.text,
                interests: contact.interests
            })
        } else {
            res.status(400)
            throw new Error('اطلاعات معتبر نیست')
        }
        
    }

    sendCollabForm = async (req, res) => {
        const { name, email, text, age } = req.body

        if (!validator.isEmail(email)) {
            res.status(400)
            throw new Error('ایمیل شما معتبر نیست')
        }

        if (age <= 15 || age >= 80) {
            res.status(400)
            throw new Error('سن شما معتبر نیست')
        }

        let career = null

        if(text) {
            career = await Career.create({
                name, email, text, age
            })
        } else {
            career = await Career.create({
                name, email, age
            })
        }

        if (career) {
            res.status(201).json({
                name: career.name,
                email: career.email,
                text: career.text,
                age: career.age
            })
        } else {
            res.status(400)
            throw new Error('اطلاعات معتبر نیست')
        }
        
    }
}

export default new formController()