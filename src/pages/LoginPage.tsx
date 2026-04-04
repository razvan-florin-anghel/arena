import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { loginService } from "../services/authService"
import { loginSchema, type LoginFormValues } from "../schemas/authSchemas"
import { useAppDispatch } from "../store/hooks"
import { login } from "../store/authSlice"

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "user@db.com", password: "" },
  })

  const mutation = useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      dispatch(login({ user: data.user, token: data.token }))
      navigate("/")
    },
  })

  const onSubmit = (values: LoginFormValues) => {
    mutation.mutate(values)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navyDeep via-brand-navy to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-brand-navy px-8 py-6 text-center">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-brand-navy font-black text-xl">Z</span>
            </div>
            <h1 className="text-white font-bold text-xl">Deutsche Bank</h1>
            <p className="text-white/70 text-sm mt-1">dbArena — Innovation Platform</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <h2 className="text-gray-800 font-bold text-2xl mb-1">Welcome back</h2>
            <p className="text-gray-500 text-sm mb-6">Sign in to your account to continue</p>

            {mutation.isError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                Sign in failed. Please check your credentials.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="user@db.com"
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 ${
                    errors.email ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 pr-10 ${
                      errors.password ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-brand-navy hover:bg-brand-navyDark text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {mutation.isPending ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-brand-navy font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
