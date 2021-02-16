/* eslint-disable prettier/prettier */
import { Router, Request, Response } from 'express'
import { isEmpty } from 'lodash'
import { error, success } from '../../core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '../../core/constants/api'
import jwt from 'jsonwebtoken'

import User from '../../core/models/User'
import passport from 'passport'
import { sendConfirmation } from '@/core/mail'

const api = Router()
api.post('/signup', async (req: Request, res: Response) => {
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
    await sendConfirmation(mail, { username })

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

api.post('/signin', async (req: Request, res: Response) => {
  const authenticate = passport.authenticate('local', { session: false }, (errorMessage, user) => {
    if (errorMessage) {
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, new Error(errorMessage)))
      return
    }

    const payload = { id: user.id, username: user.username }
    const token = jwt.sign(payload, process.env.JWT_ENCRYPTION as string)
    res.status(OK.status).json(success(user, { token }))
  })

  authenticate(req, res)
})

/*api.post('/resetpw', async (req: Request, res: Response) => {
  //todo
})

api.post('/resetpw', async (req: Request, res: Response) => {
  //todo
})
*/
export default api
