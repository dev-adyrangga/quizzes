import { QuizPayloadTypes } from '@/components/forms/quiz-form/types'
import { apiClient } from '.'
import { getEnvValues } from '@/utils/get-env-values'

export const getQuizListApi = async (token: string) => {
  const { baseUrl } = getEnvValues
  try {
    const data = await apiClient(`${baseUrl}/api/quiz/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

export const getQuizByIdApi = async (token: string, quizId: string) => {
  const { baseUrl } = getEnvValues
  try {
    const data = await apiClient(`${baseUrl}/api/quiz/${quizId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

export const updateQuizByIdApi = async (
  token: string,
  quizId: string,
  payload: QuizPayloadTypes,
  isUpdate: boolean
) => {
  const { baseUrl } = getEnvValues
  try {
    const data = await apiClient(`${baseUrl}/api/quiz/${quizId}`, {
      method: isUpdate ? 'PATCH' : 'POST',
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    throw error
  }
}
