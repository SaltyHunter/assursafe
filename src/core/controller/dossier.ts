/* eslint-disable prettier/prettier */
import { Router, Request, Response } from 'express'
import { isEmpty } from 'lodash'
import { error, success } from '@/core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '@/core/constants/api'
import User from '@/core/models/User'
import Dossier from '@/core/models/Dossier'
import { factory } from '@/core/libs/log'
import { getLogger } from 'log4js'
import { transform } from '@/core/libs/utils'

const file = transform(__filename)
const logger = getLogger(file)
const log = factory.getLogger("dossier.ts");

const api = Router({ mergeParams: true })

api.get('/', async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const dossier = await Dossier.find({ where: { user_id : userId } })
    res.status(OK.status).json(dossier)
    logger.info("Consultation des dossiers de l'utilisateur "+userId)
    log.info("Consultation des dossiers de l'utilisateur "+userId)
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error(err.message+" pour les dossiers de l'utilisateur "+userId)
    log.error(err.message+" pour les dossiers de l'utilisateur "+userId)
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
      throw new Error(`L'utilisateur ${userId } n'existe pas`)
    }
    const { name } = req.body
    const dossier = new Dossier()
    dossier.user = user
    dossier.name = name
    await dossier.save()
    res.status(CREATED.status).json(success(dossier))
    logger.info("Dossier créé pour l'utilisateur "+userId)
    log.info("Dossier créé pour l'utilisateur "+userId)
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error(err.message)
    log.error(err.message)
  }
})

api.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const { name } = req.body
    await Dossier.update({ id: id }, { name: name })
    const dossier = await Dossier.findOne({ where: { id: id } })
    res.status(OK.status).json(success(dossier))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error(err.message+" pour le dossier "+id)
    log.error(err.message+" pour le dossier "+id)
  }
})

api.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await Dossier.delete({ id: id })
    res.status(OK.status).json({ delete: 'OK' })
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error(err.message+" pour le dossier "+id)
    log.error(err.message+" pour le dossier "+id)
    }
})

export default api
