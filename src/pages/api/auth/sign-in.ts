import apiValidator from '@/libs/api-validation'
import { supabase } from '@/libs/supabase'
import { AuthSessionMissingError } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'
import cookieHelper, { CookieCtx } from '@/libs/cookie-helper'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req
  if (!body) return res.status(400).json({ code: 400, message: 'Bad Request' })
  switch (method) {
    case 'POST':
      try {
        const payload = JSON.parse(body)
        const validatedPayload = apiValidator.payload.signIn(payload)
        const { data, error } = await supabase.auth.signInWithPassword(
          validatedPayload
        )
        if (error) {
          throw error
        }
        cookieHelper.setToken(
          { res } as unknown as CookieCtx,
          data.session.access_token,
          data.session.refresh_token
        )
        cookieHelper.setUserData({ res } as unknown as CookieCtx, {
          id: data.session.user.id,
          email: data.session.user.email
        })
        return res.status(200).json(data)
      } catch (err) {
        if (err instanceof ZodError) {
          return res.status(400).json(err.errors[0])
        }
        if (err instanceof AuthSessionMissingError) {
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
