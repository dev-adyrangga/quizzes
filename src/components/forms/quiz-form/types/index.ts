import { ChangeEvent } from 'react'

export type QuizItemTypes = {
  id: string
  en: string
  ar: string
  action?: 'create' | 'update' | 'delete'
}

export type QuizOptionTypes = QuizItemTypes & {
  isCorrectOption?: boolean
}

export type QuizQuestionTypes = QuizItemTypes & {
  options: QuizOptionTypes[]
}

export type QuizTypes = QuizItemTypes & {
  questions: QuizQuestionTypes[]
}

export type QuizPayloadTypes = {
  quiz?: {
    id: string
    en: string
    ar: string
    deleted_at?: string
  }
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

export type FormChangeEventTypes = {
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement>,
    itemTypes: 'title' | 'question' | 'option',
    idxQuestion?: number,
    idxOption?: number
  ) => void
}
