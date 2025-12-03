"use client"

import { Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
      <div className="px-4 md:px-8 lg:px-12 py-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition">
            <div className="p-2 rounded-lg bg-indigo-600">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold text-slate-100 hidden sm:inline">AdCreative</span>
            <span className="text-lg md:text-xl font-bold text-slate-100 sm:hidden">AC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition ${
                pathname === "/" ? "text-indigo-400" : "text-slate-300 hover:text-indigo-400"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/docs"
              className={`text-sm font-medium transition ${
                isActive("/docs") ? "text-indigo-400" : "text-slate-300 hover:text-indigo-400"
              }`}
            >
              Docs
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white cursor-pointer hover:scale-110 transition">
              GT
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 hover:bg-white/5 rounded-lg transition" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5 text-slate-300" /> : <Menu className="w-5 h-5 text-slate-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-slate-800 pt-4">
            <Link
              href="/"
              className={`text-sm font-medium transition py-2 ${
                pathname === "/" ? "text-indigo-400" : "text-slate-300 hover:text-indigo-400"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/docs"
              className={`text-sm font-medium transition py-2 ${
                isActive("/docs") ? "text-indigo-400" : "text-slate-300 hover:text-indigo-400"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Docs
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
