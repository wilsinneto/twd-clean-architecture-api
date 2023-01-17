import { MongodbUserRepository } from '@/external/repositories/mongodb'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { RegisterUserController } from '@/web-controllers/'

export const makeRegisterUserController = (): RegisterUserController => {
  const mongoDbUserRepository = new MongodbUserRepository()
  const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(mongoDbUserRepository)
  const registerUserController = new RegisterUserController(registerUserOnMailingListUseCase)

  return registerUserController
}
