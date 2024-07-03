import { FieldError } from '../resolvers/user'
import { EmailPasswordInput } from '../resolvers/user'

export const validateRegister = (
  options: EmailPasswordInput
): FieldError[] | null => {
  if (options.username.includes(' ')) {
    return [
      {
        field: 'username',
        message: 'cannot include spaces',
      },
    ]
  }

  if (options.username.length <= 2) {
    return [{
      field: 'username',
      message: 'username length must be greater than 2'
    }]
  }

  if (options.username.includes('@')) {
    return [{
      field: 'username',
      message: 'cannot include @ sign'
    }]
  }

  if (options.email.includes(' ')) {
    return [
      {
        field: 'email',
        message: 'cannot include spaces',
      },
    ]
  }

  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'invalid email',
      },
    ]
  }

  if (options.password.length <= 3) {
    return [
      {
        field: 'password',
        message: 'password length must be greater than 3',
      },
    ]
  }

  if (options.password != options.passwordConfirmation) {
    return [
      {
        field: 'password',
        message:
          'password & password confirmation not match, please check your password again',
      },
    ]
  }

  if (!options.name) {
    return [
      {
        field: 'name',
        message: 'name cannot be empty',
      },
    ]
  }

  return null
}
