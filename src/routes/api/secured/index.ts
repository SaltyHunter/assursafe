/* eslint-disable prettier/prettier */
import { Router } from 'express'
import users from '@/core/controller/users'
import dossiers from '@/core/controller/dossier'
import files from '@/core/controller/file'

const api = Router()

api.use('/users', users)
api.use('/users/:userId/dossiers', dossiers)
api.use('/users/:userId/dossiers/:dossierId/files', files)

export default api
