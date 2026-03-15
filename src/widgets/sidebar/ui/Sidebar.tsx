'use client'

import s from './Sidebar.module.scss'
import { SidebarLink } from './SidebarLink/SidebarLink'
import { menuItems } from '@/widgets/sidebar/ui/Sidebar.config'

export const Sidebar = () => {
  const mainItems = menuItems.slice(0, 5)

  return (
    <>
      <aside className={s.sidebar}>
        <nav className={s.navSidebar}>
          <ul className={s.sidebarList}>
            {mainItems.map(item => {
              return (
                <SidebarLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  disabled={item.disabled}
                />
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
