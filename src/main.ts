/* eslint-disable prettier/prettier */
import 'reflect-metadata'
import { argv, prelude } from './core/libs/utils'
import Server from './server'
import dotenv from 'dotenv'
import { factory } from '@/core/libs/log'
import { getLogger } from 'log4js'
import { transform } from '@/core/libs/utils'


const file = transform(__filename)
const logger = getLogger(file)
const log = factory.getLogger("main.ts");

const main = async (): Promise<void> => {
  try{
    prelude()

    dotenv.config()

    const port = argv[0] || (process.env.PORT as string)
    const host = argv[1] || (process.env.HOST as string)

    const server = new Server(host, parseInt(port, 10))
    await server.run()
  } catch (err) {
    logger.error(err.message)
    log.error(err.message)
    process.exit(-1)
  }
}
main()
