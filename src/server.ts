/* eslint-disable prettier/prettier */
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import Database from '@/core/models/Database'
import '@/core/middlewares/passport'
import api from '@/routes/api'
import cors from 'cors'
import { factory } from '@/core/libs/log'
import { getLogger } from 'log4js'
import { transform } from '@/core/libs/utils'

const file = transform(__filename)
const logger = getLogger(file)
const log = factory.getLogger("server.ts");

export default class Server {
  private _host: string
  private _port: number
  private _app: Express | null = null

  public constructor(host: string, port: number) {
    this._host = host
    this._port = port
  }

  private async _initialize(): Promise<void> {
    const db = Database.getInstance()

    try {
      await db.authenticate()
    } catch (err) {
      logger.error(err.message);
      log.error(err.message);
      process.exit(-1)
    }
    logger.info('Connexion à la database établie');
    log.info('Connexion à la database établie');

    this._app = express()

    this._app.use(passport.initialize())
    this._app.use(bodyParser.json())
    this._app.use(bodyParser.urlencoded({ extended: false }))
    this._app.use(cors())

    this._app.use('/api', api)
  }

  public async run(): Promise<void> {
    await this._initialize()
    this._app?.listen(this._port, () => {
      logger.info(`Le serveur écoute sur : ${this._host}:${this._port}`);
      log.info(`Le serveur écoute sur : ${this._host}:${this._port}`);
    })
  }
}
