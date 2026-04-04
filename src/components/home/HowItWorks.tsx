import { Lightbulb, MessageSquare, Users, Rocket } from "lucide-react"

const STEPS = [
  {
    icon: Lightbulb,
    title: "Submit your Idea",
    description:
      "Share your idea or AI concept using the form below. Provide as much detail as possible to help evaluators understand your vision.",
    color: "from-blue-600 to-brand-navy",
  },
  {
    icon: MessageSquare,
    title: "Get Feedback",
    description:
      "Ideas will be reviewed by experts from the team. You will receive meaningful insights to help shape and refine your concept's potential and feasibility.",
    color: "from-brand-navy to-blue-800",
  },
  {
    icon: Users,
    title: "Start Collaboration",
    description:
      "We will encourage motivated volunteers to help develop your vision. Bring together the right people, share insights, and work together towards innovative solutions.",
    color: "from-blue-700 to-indigo-700",
  },
  {
    icon: Rocket,
    title: "Start Implementation",
    description:
      "Turn your approved idea into action. Begin working on your project, build the solution, and drive real-world impact.",
    color: "from-indigo-700 to-brand-navyDeep",
  },
]

export default function HowItWorks() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 xl:px-8 pb-6">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Here's how it works:</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xl:gap-4">
        {STEPS.map((step, idx) => {
          const Icon = step.icon
          return (
            <div key={idx} className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
              {/* Image placeholder */}
              <div className={`h-28 xl:h-32 bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                <Icon className="w-10 h-10 text-white/80" />
              </div>
              {/* Text */}
              <div className="bg-white p-3 xl:p-4">
                <p className="text-xs font-bold text-brand-navy mb-1">{step.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
