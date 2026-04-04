import { useNavigate } from "react-router-dom"
import { ArrowLeft, Construction } from "lucide-react"

interface StubPageProps {
  title: string
}

export default function StubPage({ title }: StubPageProps) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto">
          <Construction className="w-10 h-10 text-brand-navy" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">{title}</h1>
          <p className="text-gray-500 mt-2 text-lg">This section is coming soon.</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-white rounded-lg hover:bg-brand-navyDark transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  )
}
