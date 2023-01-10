/* eslint-disable n/no-path-concat */
import { Express, Router } from 'express'
import fs from 'fs'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  fs.readdirSync(`${__dirname}/../routes`).map(async file => {
    (await import(`${`${__dirname}/../routes`}/${file}`)).default(router)
  })
}
