/* eslint-disable prettier/prettier */
import { Router, Request, Response } from 'express'
import { error, success } from '@/core/helpers/response'
import { BAD_REQUEST, OK } from '@/core/constants/api'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import { sendSuppression } from '@/core/mail'
import { factory } from '@/core/libs/log'
import { getLogger } from 'log4js'
import { transform } from '@/core/libs/utils'

const file = transform(__filename)
const logger = getLogger(file)
const log = factory.getLogger("users.ts");
const api = Router()

api.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await User.findOne({ where: { id } })
    res.status(OK.status).json(success(user))
    logger.info("Consultation du profil utilisateur "+id)
    log.info("Consultation du profil utilisateur "+id)
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error(err.message+" pour l'utilisateur "+id)
    log.error(err.message+" pour l'utilisateur "+id)
  }
})

api.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const { username, password, passwordConfirmation, mail, n_tel, prenom, nom } = req.body

    if (password !== passwordConfirmation) {
      throw new Error("Le mot de passe n'est pas le meme")
    }
    const pw = bcrypt.hashSync(password)

    await User.update({ id: id }, { username: username })
    await User.update({ id: id }, { password: pw })
    await User.update({ id: id }, { mail: mail })
    await User.update({ id: id }, { n_tel: n_tel })
    await User.update({ id: id }, { nom: nom })
    await User.update({ id: id }, { prenom: prenom })

    const user = await User.findOne({ where: { id: id } })

    res.status(OK.status).json(success(user))
    logger.info("Modification effectué pour l'utilisateur "+id)
    log.info("Modification effectué pour l'utilisateur "+id)

  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error(err.message+" pour l'utilisateur "+id)
    log.error(err.message+" pour l'utilisateur "+id)
  }
})

api.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await User.findOne({ where: { id } })
    const username = user?.username
    const mail = user?.mail
    if (username !== undefined && mail !== undefined) {
      await sendSuppression(mail, { username })
      await User.delete({ id: id })
    }
    res.status(OK.status).json({ delete: 'OK' })
    logger.info("Suppression effectué pour l'utilisateur "+id)
    log.info("Suppression effectué pour l'utilisateur "+id)
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error(err.message+" pour l'utilisateur "+id)
    log.error(err.message+" pour l'utilisateur "+id)
  }
})
export default api
