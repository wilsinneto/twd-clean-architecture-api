import { Email } from "./email"

describe('Email validation', () => {

  test('should not accept null strings', () => {
    const email: null = null
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty strings', () => {
    const email: string = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept valid email', () => {
    const email: string = 'any@mail.com'
    expect(Email.validate(email)).toBeTruthy()
  })
})