import { configure, getLogger } from 'log4js'
export const logger = getLogger()
logger.level = 'debug'

configure({
  appenders: { cheese: { type: 'file', filename: 'log/api.log' } },
  categories: { default: { appenders: ['cheese'], level: 'info' } },
})
