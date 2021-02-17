/* eslint-disable prettier/prettier */
import { Router, Request, Response } from 'express'
import auth from '@/core/controller/authenticate'
import secured from './secured'
import passport from 'passport'

const api = Router()

api.get('/', (req: Request, res: Response) => {
  res.json({
    hello: "From patchakwak's Api",
    meta: {
      status: 'running',
      version: 'BETA 0.4',
    },
  })
})

api.use('/authenticate', auth)
api.use('/', passport.authenticate('jwt', { session: false }), secured)

export default api
