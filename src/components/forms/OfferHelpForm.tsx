import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, CheckCircle2, ExternalLink } from "lucide-react"
import { useOfferHelp } from "../../hooks/useHelp"
import { offerHelpSchema, type OfferHelpFormValues } from "../../schemas/helpSchemas"

const MOCK_REQUESTS = [
  "Data Analysis Support",
  "Cloud Infrastructure Help",
  "Frontend Development",
  "Backend API Design",
  "Security Review",
  "UX/UI Design Feedback",
  "Business Analysis",
  "Project Management",
]

export default function OfferHelpForm() {
  const mutation = useOfferHelp()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OfferHelpFormValues>({
    resolver: zodResolver(offerHelpSchema),
  })

  const onSubmit = (values: OfferHelpFormValues) => {
    mutation.mutate(values, { onSuccess: () => reset() })
  }

  if (mutation.isSuccess) {
    return (
      <div className="text-center py-12 space-y-3">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto" />
        <h3 className="text-lg font-bold text-gray-800">Offer Submitted!</h3>
        <p className="text-gray-500 text-sm">Thank you for offering your expertise. We'll match you with the right team.</p>
        <button
          onClick={() => mutation.reset()}
          className="mt-2 px-5 py-2 bg-brand-navy text-white rounded-lg text-sm font-medium hover:bg-brand-navyDark transition-colors"
        >
          Offer Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 text-center">Offer Help</h3>
      <p className="text-gray-500 text-sm text-center mt-1 mb-6">
        Register yourself in the Skill Directory, Then select the request where you want to offer help.
      </p>

      <div className="max-w-md mx-auto space-y-5">
        {/* Skill Directory link */}
        <div className="bg-brand-navy/5 border border-brand-navy/20 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">First, register yourself in the Skill Directory:</p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-brand-navy font-semibold hover:underline text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Click here to register into: Skill Directory
          </a>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Select Request */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Request</label>
            <select
              {...register("selectedRequest")}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-colors bg-white ${errors.selectedRequest ? "border-red-400" : "border-gray-300"}`}
            >
              <option value="">Select request</option>
              {MOCK_REQUESTS.map((req) => (
                <option key={req} value={req}>{req}</option>
              ))}
            </select>
            {errors.selectedRequest && (
              <p className="text-red-500 text-xs mt-1">{errors.selectedRequest.message}</p>
            )}
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
              {mutation.isPending ? "Submitting..." : "Offer Help"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
