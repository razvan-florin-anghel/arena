import { forwardRef } from "react"
import SubmitIdeaForm from "../forms/SubmitIdeaForm"
import SubmitAIIdeaForm from "../forms/SubmitAIIdeaForm"
import RegisterProjectForm from "../forms/RegisterProjectForm"
import GetHelpForm from "../forms/GetHelpForm"
import OfferHelpForm from "../forms/OfferHelpForm"

export type TabKey = "submit-idea" | "submit-ai-idea" | "register-project" | "get-help" | "offer-help"

const TABS: { key: TabKey; label: string }[] = [
  { key: "submit-idea", label: "Submit Idea" },
  { key: "submit-ai-idea", label: "Submit AI Idea" },
  { key: "register-project", label: "Register Your Project" },
  { key: "get-help", label: "Get Help" },
  { key: "offer-help", label: "Offer Help" },
]

interface FormTabsSectionProps {
  activeTab: TabKey
  onTabChange: (tab: TabKey) => void
}

const FormTabsSection = forwardRef<HTMLDivElement, FormTabsSectionProps>(
  ({ activeTab, onTabChange }, ref) => {
    return (
      <section ref={ref} className="max-w-[1400px] mx-auto px-4 xl:px-8 pb-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tab bar */}
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex min-w-max">
              {TABS.map((tab) => {
                const active = activeTab === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      active
                        ? "border-brand-navy text-brand-navy"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Form content */}
          <div className="p-6 xl:p-8">
            {activeTab === "submit-idea" && <SubmitIdeaForm />}
            {activeTab === "submit-ai-idea" && <SubmitAIIdeaForm />}
            {activeTab === "register-project" && <RegisterProjectForm />}
            {activeTab === "get-help" && <GetHelpForm />}
            {activeTab === "offer-help" && <OfferHelpForm />}
          </div>
        </div>
      </section>
    )
  }
)

FormTabsSection.displayName = "FormTabsSection"
export default FormTabsSection
