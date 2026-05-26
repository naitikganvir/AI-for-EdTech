'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Chat', path: '/dashboard', icon: '💬', description: 'Talk to AI' },
    { name: 'Generate', path: '/dashboard/content', icon: '✍️', description: 'Create Content' },
    { name: 'History', path: '/dashboard/history', icon: '📜', description: 'View History' },
    { name: 'Settings', path: '/dashboard/settings', icon: '⚙️', description: 'Preferences' },
  ]

  return (
    <aside className={`${
      open ? 'w-64' : 'w-20'
    } bg-gray-900 text-white transition-all duration-300 flex flex-col shadow-lg overflow-y-auto`}>
      {/* Logo */}
      <div className="flex items-center justify-center p-4 border-b border-gray-800">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-lg font-bold">
          🤖
        </div>
        {open && <span className="ml-3 text-lg font-bold">EdTech</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {open && (
                <div className="ml-3 flex-1">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className={`text-xs ${
                    isActive ? 'text-indigo-100' : 'text-gray-500 group-hover:text-gray-400'
                  }`}>
                    {item.description}
                  </div>
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 text-center text-xs text-gray-500">
        {open && <p>© 2024 AI EdTech</p>}
        {!open && <p>v1.0</p>}
      </div>
    </aside>
  )
}