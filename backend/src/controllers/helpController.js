import asyncHandler from 'express-async-handler'
import validator from 'validator'
import Help from '../models/help.js'
import HelpService from '../models/HelpService.js'

class helpController {
    createHelp = asyncHandler(async (req, res) => {
        const { name, text, serviceId, forWho } = req.body
        const help = new Help({
            name, text, forWho
        })

        await help.save()

        const helpService = new HelpService({ helpId: help._id, serviceId })

        await helpService.save()

        if (help) {
            res.status(201).json(help)
        } else {
            res.status(401)
            throw new Error('اطلاعات معتبر نیست')
        }

    })

    fetchHelps = asyncHandler(async (req, res) => {
        const pageSize = 9
        const page = Number(req.query.pageNumber) || 1
        let query = req.query.for ? { forWho: req.query.for } : {}
  
          const count = await Help.countDocuments({...query})
          const helps = await Help.find({...query})
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .populate([
              {
                path: 'helpService',
                populate: [
                  {
                    path: 'serviceId'
                  }
                ]
              },
            ])

          res.json({ helps, page, pages: Math.ceil(count / pageSize) })
    })

    updateHelp = asyncHandler(async (req, res) => {
        const { name, text, forWho } = req.body

        const help = await Help.findById(req.params.id)
  
        if (help) {
          help.name = name
          help.text = text
          help.forWho = forWho
          const updatedhelp = await help.save()
          res.json(updatedhelp)
        } else {
          res.status(404)
          throw new Error('help not found')
        }
    })

    deleteHelp = asyncHandler(async (req, res) => {
        const help = await Help.findById(req.body.id)

        if (help) {
          await HelpService.findOneAndRemove({ helpId: help._id })
          await help.remove()
          res.json({ message: 'help removed' })
        } else {
          res.status(404)
          throw new Error('help not found')
        }
    })

    fetchSingleHelp = asyncHandler(async (req, res) => {
        const help = await Help.findById(req.params.id)
        const helpService = await HelpService.find({ helpId: help._id }).populate('serviceId')

        if (help) {
            res.json({ help, service: helpService[0].serviceId })
        } else {
            res.status(404)
            throw new Error('help not found')
        }
    })
}

export default new helpController()