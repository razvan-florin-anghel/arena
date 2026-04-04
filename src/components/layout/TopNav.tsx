import { useState, useRef, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Search, ChevronDown, LogOut, User, ExternalLink } from "lucide-react"
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { logout } from "../../store/authSlice"

interface NavChild {
  label: string
  to?: string
  external?: boolean
  tab?: string // if set, navigate to /?tab=<tab>
}

interface NavItem {
  label: string
  to: string
  children: NavChild[]
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/", children: [] },
  {
    label: "Initiatives",
    to: "/initiatives",
    children: [
      { label: "This Month Initiatives", to: "/initiatives/this-month" },
      { label: "List of Ideas", to: "/initiatives/ideas" },
      { label: "Submit Idea", tab: "submit-idea" },
    ],
  },
  {
    label: "Collaboration",
    to: "/collaboration",
    children: [
      { label: "Ask for Help", tab: "get-help" },
      { label: "Offer Help", tab: "offer-help" },
      { label: "Skill Directory", to: "#", external: true },
      { label: "Communities", to: "/collaboration/communities" },
    ],
  },
  { label: "Events", to: "/events", children: [] },
  { label: "Champions Corner", to: "/champions-corner", children: [] },
]

function NavDropdownItem({ item }: { item: NavItem }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const hasChildren = item.children.length > 0
  const isActive =
    location.pathname === item.to ||
    item.children.some(
      (c) => c.to && location.pathname === c.to
    )

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  const handleChildClick = (child: NavChild) => {
    setOpen(false)
    if (child.tab) {
      navigate(`/?tab=${child.tab}`)
    } else if (child.external) {
      window.open(child.to, "_blank", "noopener,noreferrer")
    } else if (child.to) {
      navigate(child.to)
    }
  }

  if (!hasChildren) {
    return (
      <Link
        to={item.to}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors whitespace-nowrap ${
          isActive
            ? "bg-white/20 text-white"
            : "text-white/80 hover:text-white hover:bg-white/10"
        }`}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium transition-colors whitespace-nowrap ${
          isActive || open
            ? "bg-white/20 text-white"
            : "text-white/80 hover:text-white hover:bg-white/10"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-1 min-w-[200px] bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50"
          onMouseLeave={() => setOpen(false)}
        >
          {item.children.map((child) => (
            <button
              key={child.label}
              onClick={() => handleChildClick(child)}
              className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-navy/5 hover:text-brand-navy transition-colors text-left"
            >
              {child.label}
              {child.external && <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function TopNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  useEffect(() => {
    if (!userMenuOpen) return
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [userMenuOpen])

  // Close user menu on route change
  useEffect(() => {
    setUserMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 bg-brand-navy shadow-md">
      <div className="max-w-[1400px] mx-auto px-4 xl:px-8 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/" className="text-white font-bold text-base leading-tight hover:opacity-90 transition-opacity">
            Deutsche Bank
            <br />
            <span className="text-xs font-normal opacity-80">dbArena</span>
          </Link>
        </div>

        {/* Nav Links with dropdowns */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <NavDropdownItem key={item.label} item={item} />
          ))}
        </nav>

        {/* Right: Search + User + Z mark */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search */}
          <div className="hidden md:flex items-center bg-white/10 rounded px-3 py-1.5 gap-2 w-44 xl:w-56">
            <Search className="w-3.5 h-3.5 text-white/60 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-white placeholder-white/50 text-sm outline-none w-full"
              readOnly
            />
          </div>

          {/* User dropdown */}
          {user && (
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-2 text-white hover:bg-white/10 rounded px-2 py-1.5 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden xl:block text-sm font-medium max-w-[140px] truncate">{user.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform duration-150 ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Deutsche Bank Z mark */}
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center shrink-0">
            <span className="text-brand-navy font-black text-sm">Z</span>
          </div>
        </div>
      </div>
    </header>
  )
}
