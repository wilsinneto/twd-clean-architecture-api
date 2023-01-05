import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { InMemoryUserRepository } from '@test/usecases/register-user-on-mailing-list/repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'

    const response = await useCase.perform({ name, email })
    const user = repo.findUserByEmail('any@email.com')

    expect((await user).name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })

  test('should not add user with invalid email', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const invalidEmail = 'invalid_email'

    const response = (await useCase.perform({ name, email: invalidEmail })).value as Error
    const user = await repo.findUserByEmail(invalidEmail)

    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidEmailError')
  })

  test('should not add user with invalid name', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const invalidName = ''
    const email = 'any@email.com'

    const response = (await useCase.perform({ name: invalidName, email })).value as Error
    const user = await repo.findUserByEmail(email)

    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
  })
})