import { useRef, useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import TopNav from "../components/layout/TopNav"
import Footer from "../components/layout/Footer"
import HeroGrid from "../components/home/HeroGrid"
import HowItWorks from "../components/home/HowItWorks"
import FormTabsSection, { type TabKey } from "../components/home/FormTabsSection"

const VALID_TABS: TabKey[] = [
  "submit-idea",
  "submit-ai-idea",
  "register-project",
  "get-help",
  "offer-help",
]

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const formSectionRef = useRef<HTMLDivElement>(null)

  const tabParam = searchParams.get("tab") as TabKey | null
  const initialTab: TabKey =
    tabParam && VALID_TABS.includes(tabParam) ? tabParam : "submit-idea"

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab)

  // When ?tab= param changes (e.g. from nav dropdown), switch tab and scroll
  useEffect(() => {
    if (!tabParam || !VALID_TABS.includes(tabParam)) return
    setActiveTab(tabParam)
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
    // Clear the param from URL so back-button works cleanly
    setSearchParams({}, { replace: true })
  }, [tabParam]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as TabKey)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNav />
      <main className="flex-1">
        <HeroGrid onTabChange={handleTabChange} formSectionRef={formSectionRef} />
        <HowItWorks />
        <FormTabsSection
          ref={formSectionRef}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </main>
      <Footer />
    </div>
  )
}
