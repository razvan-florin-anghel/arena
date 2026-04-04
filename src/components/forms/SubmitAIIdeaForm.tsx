import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Upload, CheckCircle2 } from "lucide-react"
import { useSubmitAIIdea } from "../../hooks/useIdea"
import { submitIdeaSchema, type SubmitIdeaFormValues } from "../../schemas/ideaSchemas"

export default function SubmitAIIdeaForm() {
  const fileRef = useRef<HTMLInputElement>(null)
  const mutation = useSubmitAIIdea()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SubmitIdeaFormValues>({
    resolver: zodResolver(submitIdeaSchema),
  })

  const selectedFile = watch("file") as FileList | undefined
  const fileName = selectedFile && selectedFile[0] ? selectedFile[0].name : null

  const onSubmit = (values: SubmitIdeaFormValues) => {
    mutation.mutate(
      { ...values, file: selectedFile?.[0] ?? null },
      { onSuccess: () => reset() }
    )
  }

  if (mutation.isSuccess) {
    return (
      <div className="text-center py-12 space-y-3">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto" />
        <h3 className="text-lg font-bold text-gray-800">AI Idea Submitted!</h3>
        <p className="text-gray-500 text-sm">Your AI idea has been received. We'll be in touch soon.</p>
        <button
          onClick={() => mutation.reset()}
          className="mt-2 px-5 py-2 bg-brand-navy text-white rounded-lg text-sm font-medium hover:bg-brand-navyDark transition-colors"
        >
          Submit Another
        </button>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 text-center">Ready to submit your AI idea?</h3>
      <p className="text-gray-500 text-sm text-center mt-1 mb-1">
        Provide us with some of your information and a description of your AI idea.
      </p>
      <p className="text-gray-400 text-xs text-center mb-6">All fields, except the file attachment, are required.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your First Name</label>
            <input
              {...register("firstName")}
              placeholder="First name"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors ${errors.firstName ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Last Name</label>
            <input
              {...register("lastName")}
              placeholder="Last name"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors ${errors.lastName ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your E-mail Address</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter e-mail"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors ${errors.email ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Department</label>
            <input
              {...register("department")}
              placeholder="Enter department"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors ${errors.department ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            {...register("subject")}
            placeholder="Enter subject"
            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors ${errors.subject ? "border-red-400" : "border-gray-300"}`}
          />
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description of Your AI Idea</label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Describe your AI idea in detail..."
            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors resize-none ${errors.description ? "border-red-400" : "border-gray-300"}`}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attach File (optional)</label>
          <div
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-3 border border-dashed border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-brand-navy hover:bg-brand-navy/5 transition-colors"
          >
            <Upload className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-sm text-gray-500 truncate">
              {fileName ?? "Drop your attachment here or Upload"}
            </span>
          </div>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(e) => setValue("file", e.target.files)}
          />
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
            {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {mutation.isPending ? "Submitting..." : "Submit AI Idea"}
          </button>
        </div>
      </form>
    </div>
  )
}
