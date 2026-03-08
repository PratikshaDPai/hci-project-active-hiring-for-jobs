import { ShieldCheck } from 'lucide-react'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-emerald-600" />
          <h1 className="text-xl font-bold text-gray-900">TrustJob</h1>
          <span className="text-sm text-gray-400 ml-1 hidden sm:inline">
            Job Listing Freshness Prototype
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-center text-sm text-gray-400">
          CS6750 HCI Project — Addressing the 30-Day Trust Gap
        </div>
      </footer>
    </div>
  )
}
