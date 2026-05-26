'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  user: any
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-full">
      <Sidebar open={sidebarOpen} />
      <div className="flex-1">
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            ☰
          </button>
          <div className="text-right">
            <p className="text-sm text-gray-600">Welcome</p>
            <p className="font-semibold">{user.email}</p>
          </div>
        </div>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
