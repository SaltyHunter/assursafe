/* eslint-disable prettier/prettier */
import { Router, Request, Response } from 'express'
import { error, success } from '@/core/helpers/response'
import { BAD_REQUEST, OK, CREATED } from '@/core/constants/api'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isEmpty } from 'lodash'



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

api.post('/:id', async (req: Request, res: Response) => {
  const fields = ['username', 'mail','n_tel','nom','prenom', 'password', 'passwordConfirmation']

  try {
    const missings = fields.filter((field: string) => !req.body[field])

    if (!isEmpty(missings)) {
      const isPlural = missings.length > 1
      throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
    }

    const { username, mail, n_tel, prenom, nom, password, passwordConfirmation } = req.body

    if (password !== passwordConfirmation) {
      throw new Error("Password doesn't match")
    }

    const user = new User()

    user.username = username
    user.mail = mail
    user.n_tel = n_tel
    user.prenom = prenom
    user.nom = nom
    user.password = password

    await user.save()
    const payload = { id: user.id, username }
    const token = jwt.sign(payload, process.env.JWT_ENCRYPTION as string)
    res.status(CREATED.status).json(success(user, { token }))
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
    await User.delete({ id: id })

    res.status(OK.status).json({ delete: 'OK' })
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})
export default api
