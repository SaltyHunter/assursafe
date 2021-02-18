/* eslint-disable prettier/prettier */
import { Router, Request, Response } from 'express'
import { isEmpty } from 'lodash'
import { error, success } from '@/core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '@/core/constants/api'
import User from '@/core/models/User'
import Dossier from '@/core/models/Dossier'
import File from '@/core/models/File'
import { factory } from '@/core/libs/log'
import { getLogger } from 'log4js'
import { transform } from '@/core/libs/utils'

const file = transform(__filename)
const logger = getLogger(file)
const log = factory.getLogger("file.ts");
const api = Router({ mergeParams: true })

api.get('/', async (req: Request, res: Response) => {
  const { dossierId, userId } = req.params
  try {
    const fichier = await File.find({ where: { dossier_id : dossierId }})
    res.status(OK.status).json(fichier)
    logger.info("Consultation des fichier du dossier "+dossierId+" de l'utilisateur "+userId)
    log.info("Consultation des fichier du dossier "+dossierId+" de l'utilisateur "+userId)
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error(err.message+" pour les fichiers du dossier "+dossierId+" de l'utilisateur "+userId)
    log.error(err.message+" pour les fichiers du dossier "+dossierId+" de l'utilisateur "+userId)
  }
});

api.post('/', async (req: Request, res: Response) => {
    const fields = ['mimetype','path','content']
    const { userId, dossierId  } = req.params
    try {
      const missings = fields.filter((field: string) => !req.body[field])
  
      if (!isEmpty(missings)) {
        const isPlural = missings.length > 1
        throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
      }
  
      const user = await User.findOne({ where: { id: userId } })
      const dossier = await Dossier.findOne({ where: { id: dossierId } })

      if (!user) {
        throw new Error(`L'utilisateur ${userId } n'existe pas`)
      }
      if (!dossier) {
        throw new Error(`Le dossier ${dossierId } n'existe pas`)
      }

      const { path, mimetype, content } = req.body
      const file = new File()
  
      file.path = path;
      file.dossier = dossier;
      file.mimetype = mimetype;
      file.content = content;
      await file.save()
  
      res.status(CREATED.status).json(success(file))
      logger.info("Fichier "+file.id+"créé pour le dossier "+dossierId+" de l'utilisateur "+userId)
      log.info("Fichier "+file.id+"créé pour le dossier "+dossierId+" de l'utilisateur "+userId)
    } catch (err) {
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
      logger.error(err.message)
      log.error(err.message)
    }
  })
  
  api.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
  
      const { path, mimetype, content } = req.body
  
      await File.update({ id: id }, { path: path })
      await File.update({ id: id }, { mimetype: mimetype })
      await File.update({ id: id }, { content: content })


      const file = await File.findOne({ where: { id: id } })
  
      res.status(OK.status).json(success(file))
      logger.info("Modification effectué pour le fichier "+id)
      log.info("Modification effectué pour le fichier "+id)
    } catch (err) {
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
      logger.error(err.message+" pour le fichier "+id)
      log.error(err.message+" pour le fichier "+id)
    }
  })
  
  api.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      await File.delete({ id: id })
      res.status(OK.status).json({ delete: 'OK' })
      logger.info("Suppression effectué pour le fichier "+id)
      log.info("Suppression effectué pour le fichier "+id)

    } catch (err) {
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
      logger.error(err.message+" pour le fichier "+id)
      log.error(err.message+" pour le fichier "+id)}
  })
  
export default api
