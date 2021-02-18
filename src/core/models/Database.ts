/* eslint-disable prettier/prettier */
import dotenv from 'dotenv'
import { createConnection, Connection } from 'typeorm'
import User from './User'
import Dossier from './Dossier'
import File from './File'

export default class Database {
  private static _instance: Database | null = null
  private _connection: Connection | null = null

  private constructor() {}

  public static getInstance(): Database {
    if (!Database._instance) {
      Database._instance = new Database()
    }

    return Database._instance
  }

  public async authenticate(): Promise<Connection | never> {
    dotenv.config()

    const founded = (process.env.DATABASE_URL as string).match(/^(postgres):\/\/(.*):(.*)@(.*):(\d+)\/(.*)$/)
    if (!founded) {
      throw new Error('Verifier la valeur de la DATABASE_URL')
    }

    const [, , username, password, host, port, database] = founded

    this._connection = await createConnection({
      type: 'postgres',
      host,
      port: parseInt(port),
      username,
      password,
      database,
      entities: [User, Dossier, File],
      dropSchema: false,
      synchronize: true,
      logging: false,
    })

    return this._connection
  }
}
