import { authenticatedSupabase } from '@/libs/supabase'
import { AuthSessionMissingError } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers } = req
  const { authorization } = headers
  if (!authorization) {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized'
    })
  }
  switch (method) {
    case 'GET':
      try {
        const { data, error } = await authenticatedSupabase(authorization)
          .from('quiz')
          .select('*, questions:quiz_question(*)')
        if (error) {
          throw error
        }
        return res.status(200).json(data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err instanceof ZodError) {
          return res.status(400).json(err.errors[0])
        }
        if (
          err instanceof AuthSessionMissingError ||
          err?.code === 'PGRST301'
        ) {
          return res.status(401).json({
            code: 401,
            message: 'Unauthorized'
          })
        }
        return res
          .status(500)
          .json({ code: 500, message: 'Internal server error' })
      }
    default:
      return res.status(400).json({ code: 400, message: 'Bad Request' })
  }
}
