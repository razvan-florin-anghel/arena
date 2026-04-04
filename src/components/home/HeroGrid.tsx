import { Lightbulb, HelpCircle, FolderKanban, Star } from "lucide-react"

interface HeroGridProps {
  onTabChange: (tab: string) => void
  formSectionRef: React.RefObject<HTMLDivElement>
}

const scrollToForm = (ref: React.RefObject<HTMLDivElement>) => {
  ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export default function HeroGrid({ onTabChange, formSectionRef }: HeroGridProps) {
  const handleCta = (tab: string) => {
    onTabChange(tab)
    setTimeout(() => scrollToForm(formSectionRef), 50)
  }

  return (
    <section className="max-w-[1400px] mx-auto px-4 xl:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Submit Idea */}
        <div className="relative rounded-xl overflow-hidden min-h-[180px] xl:min-h-[200px] bg-gradient-to-br from-[#0018A8] to-[#0033CC] text-white p-6 flex flex-col justify-between">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, rgba(100,150,255,0.5) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center mb-3">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg xl:text-xl font-bold leading-snug">
              Got an Idea — AI or otherwise?
              <br />
              Submit an initiative.
            </h2>
            <p className="text-white/75 text-sm mt-1.5 leading-relaxed">
              Let's make it a reality! Share your concept, and we'll provide expert feedback.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => handleCta("submit-idea")}
              className="px-4 py-1.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-medium rounded-md transition-colors"
            >
              Submit Idea
            </button>
            <button
              onClick={() => handleCta("submit-ai-idea")}
              className="px-4 py-1.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-medium rounded-md transition-colors"
            >
              Submit AI Idea
            </button>
          </div>
        </div>

        {/* Card 2: Collaboration */}
        <div className="relative rounded-xl overflow-hidden min-h-[180px] xl:min-h-[200px] bg-gradient-to-br from-[#0033DD] to-[#1155FF] text-white p-6 flex flex-col justify-between">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 80%, rgba(80,120,255,0.6) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center mb-3">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg xl:text-xl font-bold leading-snug">
              Start Collaboration. We're right here to assist.
            </h2>
            <p className="text-white/75 text-sm mt-1.5 leading-relaxed">
              Collaborate, learn, and find solutions together.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => handleCta("get-help")}
              className="px-4 py-1.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-medium rounded-md transition-colors"
            >
              Get Help
            </button>
            <button
              onClick={() => handleCta("offer-help")}
              className="px-4 py-1.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-medium rounded-md transition-colors"
            >
              Offer Help
            </button>
          </div>
        </div>

        {/* Card 3: Projects Workspace */}
        <div className="relative rounded-xl overflow-hidden min-h-[160px] xl:min-h-[180px] bg-gradient-to-br from-[#000D5C] to-[#0018A8] text-white p-6 flex flex-col justify-between">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 90% 90%, rgba(100,130,255,0.4) 0%, transparent 50%)",
            }}
          />
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center mb-3">
              <FolderKanban className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg xl:text-xl font-bold">Projects Workspace</h2>
            <p className="text-white/75 text-sm mt-1.5 leading-relaxed">
              A space to submit your project and initiate collaboration.
            </p>
          </div>
          <div className="relative z-10 mt-4">
            <button
              onClick={() => handleCta("register-project")}
              className="px-4 py-1.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-medium rounded-md transition-colors"
            >
              Register Your Project
            </button>
          </div>
        </div>

        {/* Card 4: Champions Corner */}
        <div className="relative rounded-xl overflow-hidden min-h-[160px] xl:min-h-[180px] bg-gradient-to-br from-[#001080] to-[#002AE0] text-white p-6 flex flex-col justify-between">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 10%, rgba(200,210,255,0.4) 0%, transparent 50%)",
            }}
          />
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center mb-3">
              <Star className="w-5 h-5 text-yellow-300" />
            </div>
            <h2 className="text-lg xl:text-xl font-bold leading-snug">
              Champions Corner. Level up your journey with points!
            </h2>
            <p className="text-white/75 text-sm mt-1.5 leading-relaxed">
              Track your progress, earn points, and unlock exciting rewards.
            </p>
          </div>
          <div className="relative z-10 mt-4">
            <a
              href="/champions-corner"
              className="inline-block px-4 py-1.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-medium rounded-md transition-colors"
            >
              Start Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
