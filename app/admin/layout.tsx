'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/shared/auth/authContext'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (!isLoggedIn && !isLoginPage) {
      router.replace('/admin/login')
    }
  }, [isLoggedIn, isLoginPage, router])

  if (isLoginPage) {
    return <>{children}</>
  }

  if (!isLoggedIn) {
    return (
      <div
        style={{
          minHeight: '240px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Loading...
      </div>
    )
  }

  return <>{children}</>
}
