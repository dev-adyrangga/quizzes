import { QuizPayloadTypes } from '@/components/forms/quiz-form/types'
import { authenticatedSupabase } from '@/libs/supabase'
import { AuthSessionMissingError } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers, query, body } = req
  const { id } = query
  const { authorization } = headers
  if (!authorization) {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized'
    })
  }
  if (!id) {
    return res.status(400).json({ code: 400, message: 'Bad Request' })
  }

  try {
    const supabase = authenticatedSupabase(authorization)
    switch (method) {
      case 'GET': {
        const { data, error } = await supabase
          .from('quiz')
          .select(
            'id, en, ar, questions:quiz_question(id, en, ar, options:answer_option(id, en, ar, isCorrectOption:is_correct_option))'
          )
          .eq('id', id)
        if (error) {
          throw error
        }
        return res.status(200).json(data[0])
      }
      case 'POST':
      case 'PATCH': {
        if (!body) {
          return res.status(400).json({ code: 400, message: 'Bad Request' })
        }
        const payload = JSON.parse(body)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let upsertError: any = null
        const { quiz, questions, options } = payload as QuizPayloadTypes
        if (quiz?.id) {
          const { error } = await supabase.from('quiz').upsert(quiz)
          upsertError = error
        }
        if (questions.length > 0) {
          const actions = questions.map((item) =>
            supabase.from('quiz_question').upsert(item)
          )
          const results = await Promise.all(actions)
          upsertError = results.find((result) => !!result.error) || upsertError
        }
        if (options.length > 0) {
          const actions = options.map((item) =>
            supabase.from('answer_option').upsert(item)
          )
          const results = await Promise.all(actions)
          upsertError = results.find((result) => !!result.error) || upsertError
        }
        if (upsertError) {
          throw { upsertError: true, error: upsertError }
        }
        const { data, error } = await supabase
          .from('quiz')
          .select(
            'id, en, ar, questions:quiz_question(id, en, ar, options:answer_option(id, en, ar, isCorrectOption:is_correct_option))'
          )
          .eq('id', id)
        if (error) {
          throw error
        }
        return res.status(200).json(data[0])
      }
      default: {
        return res.status(400).json({ code: 400, message: 'Bad Request' })
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.upsertError) {
      return res
        .status(400)
        .json({ code: 400, message: 'Bad Request', ...err.upsertError.error })
    }
    if (err instanceof ZodError) {
      return res.status(400).json(err.errors[0])
    }
    if (err instanceof AuthSessionMissingError || err?.code === 'PGRST301') {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized'
      })
    }
    return res.status(500).json({ code: 500, message: 'Internal server error' })
  }
}
