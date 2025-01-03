import { SignInValueTypes } from '@/components/forms/types'
import { apiClient } from '.'
import { getEnvValues } from '@/utils/get-env-values'

export const signInApi = async (payload: SignInValueTypes) => {
  const { baseUrl } = getEnvValues
  try {
    const data = await apiClient(`${baseUrl}/api/auth/sign-in/`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    return data
  } catch (error) {
    throw error
  }
}

export const signUpApi = async (payload: SignInValueTypes) => {
  const { baseUrl } = getEnvValues
  try {
    const data = await apiClient(`${baseUrl}/api/auth/sign-up/`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    return data
  } catch (error) {
    throw error
  }
}
