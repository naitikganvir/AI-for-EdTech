'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Chat', path: '/dashboard', icon: '💬' },
    { name: 'Content', path: '/dashboard/content', icon: '📝' },
    { name: 'History', path: '/dashboard/history', icon: '📚' },
    { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
  ]

  return (
    <aside className={`${open ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 hidden md:block`}>
      <div className="p-4">
        <Link href="/dashboard" className="text-2xl font-bold">
          {open ? 'AI EdTech' : '🤖'}
        </Link>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center px-4 py-3 ${
              pathname === item.path
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {open && <span className="ml-4">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
