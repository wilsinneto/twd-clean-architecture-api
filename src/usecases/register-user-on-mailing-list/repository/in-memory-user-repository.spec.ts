import { InMemoryUserRepository } from "./in-memory-user-repository"

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@mail.com')
    expect(user).toBeNull()
  })
})
