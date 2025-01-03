import { z } from 'zod'

export const signInPayloadSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Must be at least 6 characters')
})
