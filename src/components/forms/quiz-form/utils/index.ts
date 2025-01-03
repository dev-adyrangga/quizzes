import { uuidV4 } from '@/utils/uuid-v4'
import { QuizItemTypes, QuizPayloadTypes, QuizTypes } from '../types'
import { dateUtils } from '@/utils/date-utils'

export const newItemValue = (): QuizItemTypes => ({
  id: uuidV4(),
  en: '',
  ar: '',
  action: 'create'
})

export const newOptionValue = () => ({
  ...newItemValue(),
  isCorrectOption: false
})

export const newQuestionValue = () => ({
  ...newItemValue(),
  options: [newOptionValue()]
})

export const quizInitValue = () => ({
  ...newItemValue(),
  questions: [newQuestionValue()]
})

export const getPayload = (values: QuizTypes): QuizPayloadTypes => {
  const isoDate = dateUtils.currentIsoDate()
  let quiz = undefined as
    | {
        id: string
        en: string
        ar: string
        deleted_at?: string
      }
    | undefined
  if (values.action) {
    quiz = {
      id: values.id,
      en: values.en,
      ar: values.ar
    }
    if (values.action === 'delete') {
      quiz.deleted_at = isoDate
    }
  }
  const { questions, options } = values.questions.reduce(
    (acc, curr) => {
      if (curr.action) {
        const item = {
          id: curr.id,
          quiz_id: values.id,
          en: curr.en,
          ar: curr.ar
        } as {
          id: string
          quiz_id: string
          en: string
          ar: string
          deleted_at?: string
        }
        if (curr.action === 'delete') {
          item.deleted_at = isoDate
        }
        acc.questions.push(item)
      }
      acc.options = curr.options.reduce(
        (accOpt, currOpt) => {
          if (currOpt.action) {
            const item = {
              id: currOpt.id,
              quiz_id: values.id,
              question_id: curr.id,
              en: currOpt.en,
              ar: currOpt.ar,
              is_correct_option: currOpt.isCorrectOption
            } as {
              id: string
              quiz_id: string
              question_id: string
              en: string
              ar: string
              is_correct_option: boolean
              deleted_at?: string
            }
            if (currOpt.action === 'delete') {
              item.deleted_at = isoDate
            }
            accOpt.push(item)
          }
          return accOpt
        },
        [] as {
          id: string
          quiz_id: string
          question_id: string
          en: string
          ar: string
          is_correct_option: boolean
          deleted_at?: string
        }[]
      )
      return acc
    },
    { questions: [], options: [] } as {
      questions: {
        id: string
        quiz_id: string
        en: string
        ar: string
        deleted_at?: string
      }[]
      options: {
        id: string
        quiz_id: string
        question_id: string
        en: string
        ar: string
        is_correct_option?: boolean
        deleted_at?: string
      }[]
    }
  )
  return { quiz, questions, options }
}
