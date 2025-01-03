import { signInPayloadSchema } from './schemas/sign-in-schema'

const apiValidator = {
  payload: {
    signIn: (payload: object) => signInPayloadSchema.parse(payload)
  }
}

export default apiValidator
