export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: { name: string; email: string }
  token: string
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const loginService = async (data: LoginPayload): Promise<AuthResponse> => {
  await delay(1500)
  return {
    user: { name: "DB User", email: data.email },
    token: "mock-jwt-token",
  }
}

export const registerService = async (data: RegisterPayload): Promise<AuthResponse> => {
  await delay(1500)
  return {
    user: { name: data.name, email: data.email },
    token: "mock-jwt-token",
  }
}
