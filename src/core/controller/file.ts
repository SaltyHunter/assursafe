/* eslint-disable prettier/prettier */
import { Router, Request, Response } from 'express'
import { isEmpty } from 'lodash'
import { error, success } from '@/core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '@/core/constants/api'
import User from '@/core/models/User'
import Dossier from '@/core/models/Dossier'
import File from '@/core/models/File'

const api = Router({ mergeParams: true })

api.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const file = await File.findOne({ where: { id: id } })
    res.status(OK.status).json(success(file))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.post('/', async (req: Request, res: Response) => {
    const fields = ['name','mimetype','size','dossier','path']
  
    try {
      const missings = fields.filter((field: string) => !req.body[field])
  
      if (!isEmpty(missings)) {
        const isPlural = missings.length > 1
        throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
      }
  
      const { userId, dossierId  } = req.params
      const user = await User.findOne({ where: { id: userId } })
      const dossier = await Dossier.findOne({ where: { id: dossierId } })

      if (!user) {
        throw new Error(`User ${userId } doens't exist`)
      }
      if (!dossier) {
        throw new Error(`Buck ${dossierId } doens't exist`)
      }

      const { name, mimetype, size } = req.body
      const file = new File()
  
      file.name = name;
      file.mimetype = mimetype;
      file.size = size;
      file.dossier = dossier;
      await file.save()
  
      res.status(CREATED.status).json(success(file))
    } catch (err) {
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
  })
  
  api.put('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params
  
      const { name, mimetype, size } = req.body
  
      await File.update({ id: id }, { name: name })
      await File.update({ id: id }, { mimetype: mimetype })
      await File.update({ id: id }, { size: size })

      const file = await File.findOne({ where: { id: id } })
  
      res.status(OK.status).json(success(file))
    } catch (err) {
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
  })
  
  api.delete('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await File.delete({ id: id })
  
      res.status(OK.status).json({ delete: 'OK' })
    } catch (err) {
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
  })
  
export default api
