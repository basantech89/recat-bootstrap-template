import { rest } from 'msw'
import { constructUrl } from 'utils/client'

export const handlers = [
  rest.post(constructUrl('auth/login'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(200),
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
  }),
  rest.get(constructUrl('users'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json({
        success: true,
        data: [
          {
            first_name: 'John',
            last_name: 'Smith',
            email: 'jsmith@example.com',
            user_id: '1234'
          },
          {
            first_name: 'Jay',
            last_name: 'Jaden',
            email: 'jay@example.com',
            user_id: '2345'
          }
        ]
      })
    )
  }),
  rest.get(constructUrl('todos'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(100),
      ctx.json({
        success: true,
        data: [
          {
            todo_id: '1234',
            title: 'Task 1',
            description: 'Description for task 1',
            done: false
          },
          {
            todo_id: '2345',
            title: 'Task 2',
            description: 'Description for task 2',
            done: true
          }
        ]
      })
    )
  })
]
