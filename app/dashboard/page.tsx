"use client"

import Navbar from "@/components/navbar"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Navbar />
      <main className="px-4 md:px-8 lg:px-12 py-12 max-w-7xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2">Dashboard</h1>
            <p className="text-slate-400">Welcome back! Your creative campaigns and analytics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur">
              <p className="text-slate-400 text-sm font-medium mb-2">Total Campaigns</p>
              <p className="text-3xl font-bold text-slate-100">0</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur">
              <p className="text-slate-400 text-sm font-medium mb-2">Images Generated</p>
              <p className="text-3xl font-bold text-slate-100">0</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur">
              <p className="text-slate-400 text-sm font-medium mb-2">Saved Collections</p>
              <p className="text-3xl font-bold text-slate-100">0</p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur text-center">
            <p className="text-slate-300">
              Start by creating a new campaign on the home page to see your statistics here.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
