import Login from '../Login'

import { axe } from 'jest-axe'
import React from 'react'
import render, { screen } from 'test-utils'

describe('Login', () => {
  test('snapshot test', () => {
    const { container } = render(<Login />)
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="login"
        >
          <form
            class="login-form"
          >
            <h6>
              Hello there, Sign in to continue
            </h6>
            <div
              class="login-form-group"
            >
              <label
                class="form-label"
                for="email"
              >
                Email
              </label>
              <div
                class="append"
              >
                <input
                  class="form-control"
                  id="email"
                  name="email"
                  rules="[object Object]"
                  value=""
                />
              </div>
            </div>
            <div
              class="login-form-group"
            >
              <label
                class="form-label"
                for="password"
              >
                Password
              </label>
              <div
                class="append"
              >
                <input
                  class="form-control"
                  id="password"
                  name="password"
                  rules="[object Object]"
                  type="password"
                  value=""
                />
                <button
                  aria-label="Toggle Password Visibility"
                  class="icon-btn input-icon-btn btn btn-primary"
                  type="button"
                >
                  <svg
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 16 16"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                    />
                    <path
                      d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button
              class="btn btn-primary"
              disabled=""
              type="submit"
            >
              Next
            </button>
          </form>
          <button
            class="btn btn-link"
            type="button"
          >
            Signup
          </button>
        </div>
      </div>
    `)
  })

  test('Login component should be accessible', async () => {
    const { container } = render(<Login />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })

  test('Next button should be disabled', () => {
    render(<Login />)

    const nextBtn = screen.getByText('Next')

    expect(nextBtn).toBeInTheDocument()
    expect(nextBtn).toBeDisabled()
  })
})
