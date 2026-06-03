'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/shared/auth/authContext'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isAuthResolved } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isAuthResolved && !isLoggedIn && !isLoginPage) {
      router.replace('/admin/login')
    }
  }, [isAuthResolved, isLoggedIn, isLoginPage, router])

  if (isLoginPage) {
    return <>{children}</>
  }

  if (!isAuthResolved || !isLoggedIn) {
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
