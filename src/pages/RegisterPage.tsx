import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { registerService } from "../services/authService"
import { registerSchema, type RegisterFormValues } from "../schemas/authSchemas"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const mutation = useMutation({
    mutationFn: registerService,
    onSuccess: () => navigate("/login"),
  })

  const onSubmit = (values: RegisterFormValues) => {
    mutation.mutate(values)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navyDeep via-brand-navy to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
            <h2 className="text-gray-800 font-bold text-2xl mb-1">Create account</h2>
            <p className="text-gray-500 text-sm mb-6">Join the dbArena innovation platform</p>

            {mutation.isError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                Registration failed. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="DB User"
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="user@db.com"
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors ${
                    errors.email ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors pr-10 ${
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
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors pr-10 ${
                      errors.confirmPassword ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-brand-navy hover:bg-brand-navyDark text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
              >
                {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {mutation.isPending ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-brand-navy font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
