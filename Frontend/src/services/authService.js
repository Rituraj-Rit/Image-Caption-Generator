const BASE_URL = '/api/auth'

export const registerUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message = payload?.message || 'Registration failed. Please check your details.'
    throw new Error(message)
  }

  return payload
}

export const loginUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message = payload?.message || 'Invalid credentials.'
    throw new Error(message)
  }

  return payload
}
