/* eslint-disable prettier/prettier */
import { Router, Request, Response } from 'express'
import { error, success } from '@/core/helpers/response'
import { BAD_REQUEST, OK } from '@/core/constants/api'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import { sendSuppression } from '@/core/mail'
import { use } from 'passport'



const api = Router()

api.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await User.findOne({ where: { id } })

    res.status(OK.status).json(success(user))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { username, password, passwordConfirmation, mail, n_tel, prenom, nom } = req.body

    if (password !== passwordConfirmation) {
      throw new Error("Password doesn't match")
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
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ where: { id } })
    const username = user?.username
    const mail = user?.mail
    if (username !== undefined && mail !== undefined) {
      await sendSuppression(mail, { username })
      await User.delete({ id: id })
    }
    res.status(OK.status).json({ delete: 'OK' })

  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})
export default api
