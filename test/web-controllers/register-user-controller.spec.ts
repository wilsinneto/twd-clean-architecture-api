import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { UserRepository } from '@/usecases/ports'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { InMemoryUserRepository } from '@test/usecases/register-user-on-mailing-list/repository'

describe('Register user web controller', () => {
  test('should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@mail.com'
      }
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(useCase)
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })

  test('should return status code 400 when request contains invalid user name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'A',
        email: 'any@mail.com'
      }
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(useCase)
    const response: HttpResponse = await controller.handle(requestWithInvalidName)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('should return status code 400 when request contains invalid user email', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any_mail.com'
      }
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(useCase)
    const response: HttpResponse = await controller.handle(requestWithInvalidEmail)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  test('should return status code 400 when request is missing user name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        email: 'any@mail.com'
      }
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(useCase)
    const response: HttpResponse = await controller.handle(requestWithInvalidName)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test('should return status code 400 when request is missing user name and email', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {}
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(useCase)
    const response: HttpResponse = await controller.handle(requestWithInvalidEmail)
    console.log('response.body', response.body)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name email.')
  })
})
