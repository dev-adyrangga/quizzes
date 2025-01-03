import { QuizPayloadTypes } from '@/components/forms/quiz-form/types'
import {
  getQuizByIdApi,
  getQuizListApi,
  updateQuizByIdApi
} from '@/libs/api-client/quiz-api'

export const getQuisListAdapter = async (token: string) => {
  try {
    const data = await getQuizListApi(token)
    return data
  } catch (error) {
    throw error
  }
}

export const getQuisByIdAdapter = async (token: string, quizId: string) => {
  try {
    const data = await getQuizByIdApi(token, quizId)
    return { data, error: null }
  } catch (error) {
    return { error, data: null }
  }
}

export const storeQuizAdapter = async (
  token: string,
  quizId: string,
  payload: QuizPayloadTypes,
  isUpdate: boolean
) => {
  try {
    const data = await updateQuizByIdApi(token, quizId, payload, isUpdate)
    return data
  } catch (error) {
    throw error
  }
}
