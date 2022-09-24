import { rest } from 'msw'
import { constructUrl } from 'utils/client'

export const handlers = [
  rest.post(constructUrl('auth/login'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        success: true,
        message: 'User signed in successfully.',
        data: {
          id: '1234',
          first_name: 'John',
          last_name: 'Smith',
          email: 'test@example.com',
          token: '123456'
        }
      })
    )
  }),
  rest.post(constructUrl('auth/register'), (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.delay(2000),
      ctx.json({
        success: true,
        message: 'User successfully signed up.'
      })
    )
  })
]
