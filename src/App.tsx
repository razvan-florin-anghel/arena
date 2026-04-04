import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { store } from "./store"
import ProtectedRoute from "./router/ProtectedRoute"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import StubPage from "./pages/StubPage"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
    mutations: { retry: 0 },
  },
})

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/initiatives"
              element={
                <ProtectedRoute>
                  <StubPage title="Initiatives" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/collaboration"
              element={
                <ProtectedRoute>
                  <StubPage title="Collaboration" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <StubPage title="Events" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/champions-corner"
              element={
                <ProtectedRoute>
                  <StubPage title="Champions Corner" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/initiatives/this-month"
              element={
                <ProtectedRoute>
                  <StubPage title="This Month Initiatives" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/initiatives/ideas"
              element={
                <ProtectedRoute>
                  <StubPage title="List of Ideas" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/collaboration/communities"
              element={
                <ProtectedRoute>
                  <StubPage title="Communities" />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}
