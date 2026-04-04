import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthUser {
  name: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  token: string | null
}

const storedUser = localStorage.getItem("db_user")
const storedToken = localStorage.getItem("db_token")

const initialState: AuthState = {
  isAuthenticated: !!storedToken,
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: AuthUser; token: string }>) {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem("db_user", JSON.stringify(action.payload.user))
      localStorage.setItem("db_token", action.payload.token)
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      localStorage.removeItem("db_user")
      localStorage.removeItem("db_token")
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
