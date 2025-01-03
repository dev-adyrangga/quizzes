import { SignInValueTypes } from '@/components/forms/types'
import { signInApi, signUpApi } from '@/libs/api-client/sign-in-api'

export const signInAdapter = async (payload: SignInValueTypes) => {
  try {
    const data = await signInApi(payload)
    return data
  } catch (error) {
    throw error
  }
}

export const signUpAdapter = async (payload: SignInValueTypes) => {
  try {
    const data = await signUpApi(payload)
    return data
  } catch (error) {
    throw error
  }
}
