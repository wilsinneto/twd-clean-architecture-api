export class Email {
  static validate(email: string) {
    if(!email) {
      return false
    }

    return true
  }
}