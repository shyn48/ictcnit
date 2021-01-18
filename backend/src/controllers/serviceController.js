import asyncHandler from 'express-async-handler'
import validator from 'validator'
import Service from '../models/Service.js'

class serviceController {
    createService = asyncHandler(async (req, res) => {
        const { name, text } = req.body
        const service = new Service({
            name, text
        })

        await service.save()

        if (service) {
            res.status(201).json(service)
        } else {
            res.status(401)
            throw new Error('اطلاعات معتبر نیست')
        }

    })

    fetchServices = asyncHandler(async (req, res) => {
        const pageSize = 9
        const page = Number(req.query.pageNumber) || 1
  
          const count = await Service.countDocuments({})
          const services = await Service.find({})
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1))

          res.json({ services, page, pages: Math.ceil(count / pageSize) })
    })

    updateService = asyncHandler(async (req, res) => {
        const { name, text } = req.body

        const service = await Service.findById(req.params.id)
  
        if (service) {
          service.name = name
          service.text = text
          const updatedservice = await service.save()
          res.json(updatedservice)
        } else {
          res.status(404)
          throw new Error('service not found')
        }
    })

    deleteService = asyncHandler(async (req, res) => {
        const service = await Service.findById(req.body.id)

        if (service) {
          await service.remove()
          res.json({ message: 'service removed' })
        } else {
          res.status(404)
          throw new Error('service not found')
        }
    })

    fetchSingleService = asyncHandler(async (req, res) => {
        const service = await Service.findById(req.params.id)
        if (service) {
            res.json(service)
        } else {
            res.status(404)
            throw new Error('service not found')
        }
    })
}

export default new serviceController()