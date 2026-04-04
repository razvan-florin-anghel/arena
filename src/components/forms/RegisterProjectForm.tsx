import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Upload, CheckCircle2, Sparkles } from "lucide-react"
import { useRegisterProject } from "../../hooks/useProject"
import { registerProjectSchema, type RegisterProjectFormValues } from "../../schemas/projectSchemas"

export default function RegisterProjectForm() {
  const fileRef = useRef<HTMLInputElement>(null)
  const mutation = useRegisterProject()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterProjectFormValues>({
    resolver: zodResolver(registerProjectSchema),
  })

  const selectedFile = watch("ideaImage") as FileList | undefined
  const fileName = selectedFile && selectedFile[0] ? selectedFile[0].name : null

  const onSubmit = (values: RegisterProjectFormValues) => {
    mutation.mutate(
      { ...values, ideaImage: selectedFile?.[0] ?? null },
      { onSuccess: () => reset() }
    )
  }

  if (mutation.isSuccess) {
    return (
      <div className="text-center py-12 space-y-3">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto" />
        <h3 className="text-lg font-bold text-gray-800">Project Registered!</h3>
        <p className="text-gray-500 text-sm">Your project has been registered. We'll be in touch soon.</p>
        <button
          onClick={() => mutation.reset()}
          className="mt-2 px-5 py-2 bg-brand-navy text-white rounded-lg text-sm font-medium hover:bg-brand-navyDark transition-colors"
        >
          Register Another
        </button>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 text-center">Ready to register your project?</h3>
      <p className="text-gray-500 text-sm text-center mt-1 mb-1">
        Share your project details and help us understand your objectives.
      </p>
      <p className="text-gray-400 text-xs text-center mb-6">All fields, except the file attachment, are required.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Row 1: Title + Sponsor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Idea Title</label>
            <input
              {...register("projectTitle")}
              placeholder="Enter title"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors ${errors.projectTitle ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.projectTitle && <p className="text-red-500 text-xs mt-1">{errors.projectTitle.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DE Project Sponsor</label>
            <input
              {...register("projectSponsor")}
              placeholder="Type or select name or e-mail"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors ${errors.projectSponsor ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.projectSponsor && <p className="text-red-500 text-xs mt-1">{errors.projectSponsor.message}</p>}
          </div>
        </div>

        {/* Idea Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Idea Image (optional)</label>
          <div
            onClick={() => fileRef.current?.click()}
            className="flex items-center justify-between border border-dashed border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-brand-navy hover:bg-brand-navy/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Upload className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-sm text-gray-500 truncate">
                {fileName ?? "Drop your attachment here or "}
                {!fileName && <span className="text-brand-navy underline">Upload</span>}
              </span>
            </div>
            <Upload className="w-4 h-4 text-gray-400" />
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setValue("ideaImage", e.target.files)}
          />
        </div>

        {/* Row 3: Abstract + Problem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Abstract</label>
            <textarea
              {...register("abstract")}
              rows={4}
              placeholder="Enter abstract"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors resize-none ${errors.abstract ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.abstract && <p className="text-red-500 text-xs mt-1">{errors.abstract.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What is the Problem/Opportunity?</label>
            <textarea
              {...register("problemOpportunity")}
              rows={4}
              placeholder="Enter problem/opportunity"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors resize-none ${errors.problemOpportunity ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.problemOpportunity && <p className="text-red-500 text-xs mt-1">{errors.problemOpportunity.message}</p>}
          </div>
        </div>

        {/* Row 4: Solution + Help */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What's the Proposed Solution?</label>
            <textarea
              {...register("proposedSolution")}
              rows={4}
              placeholder="Enter solution"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors resize-none ${errors.proposedSolution ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.proposedSolution && <p className="text-red-500 text-xs mt-1">{errors.proposedSolution.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What Help are you Looking for?</label>
            <textarea
              {...register("helpLookingFor")}
              rows={4}
              placeholder="Enter text"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors resize-none ${errors.helpLookingFor ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.helpLookingFor && <p className="text-red-500 text-xs mt-1">{errors.helpLookingFor.message}</p>}
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center leading-relaxed">
          Please Note: Do not submit any confidential or sensitive company information.
          <br />
          We reserve the right not to respond to any fraudulent or invalid submissions.
        </p>

        <div className="flex justify-center pt-1">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-8 py-2.5 bg-brand-navy hover:bg-brand-navyDark text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {mutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {mutation.isPending ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  )
}
