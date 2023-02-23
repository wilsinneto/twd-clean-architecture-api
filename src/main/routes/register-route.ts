import { adaptRoute } from '@/main/adapters'
import { makeRegisterAndSendEmailController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegisterAndSendEmailController()))
}
