import { useState } from "react"
import { Menu, X, BarChart3 } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="w-full bg-white border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          {/* Left - Logo */}
          <div className="shrink-0">
            <a href="/" className="shrink-0">
              <p className="text-3xl font-lobster text-gray-900">
                Foodieland
                <span className="text-3xl font-lobster text-orange-500">.</span>
              </p>
            </a>
          </div>
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-900 hover:text-orange-500 font-medium transition-colors font-inter"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg transition-colors group"
              title="Admin Dashboard"
            >
              <BarChart3 className="w-5 h-5 text-gray-900 group-hover:text-orange-500" />
              <span className="text-sm font-inter text-gray-900 group-hover:text-orange-500 font-medium transition-colors">Dashboard</span>
            </a>

            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
            </button>
          </div>
        </div>
        
        
        {/*Mobile nav*/}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/admin"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 font-medium transition-colors font-inter"
                onClick={() => setIsOpen(false)}
              >
                <BarChart3 className="w-5 h-5" />
                Dashboard
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
