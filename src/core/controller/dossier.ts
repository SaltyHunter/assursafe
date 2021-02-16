/* eslint-disable prettier/prettier */
import { Router, Request, Response } from 'express'
import { isEmpty } from 'lodash'

import { error, success } from '@/core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '@/core/constants/api'
import User from '@/core/models/User'
import Dossier from '@/core/models/Dossier'

const api = Router({ mergeParams: true })

api.get('/', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const dossier = await Dossier.find({ where: { user_id : userId } })
    res.status(OK.status).json(dossier)
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.post('/', async (req: Request, res: Response) => {
  const fields = ['name']

  try {
    const missings = fields.filter((field: string) => !req.body[field])

    if (!isEmpty(missings)) {
      const isPlural = missings.length > 1
      throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
    }

    const { userId  } = req.params
    const user = await User.findOne({ where: { id: userId } })

    if (!user) {
      throw new Error(`User ${userId } doens't exist`)
    }

    const { name } = req.body

    const dossier = new Dossier()

    dossier.user = user
    dossier.name = name

    await dossier.save()

    res.status(CREATED.status).json(success(dossier))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { name } = req.body

    await Dossier.update({ id: id }, { name: name })

    const dossier = await Dossier.findOne({ where: { id: id } })

    res.status(OK.status).json(success(dossier))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await Dossier.delete({ id: id })

    res.status(OK.status).json({ delete: 'OK' })
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

export default api
