'use client'

import { createContext, useContext, useState } from 'react'

type AuthContextType = { // структура данных которая будет в контексте
  isLoggedIn: boolean
  login: () => void
}


// Что делает createContext? Создай место, откуда компоненты могут читать данные без props
const AuthContext = createContext<AuthContextType>({ // создаётся сам контекст
  isLoggedIn: false,
  login: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = () => setIsLoggedIn(true) //при вызове → устанавливает isLoggedIn = true


  // передаём isLoggedIn, login
  return (
    <AuthContext.Provider value={{ isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

//createContext → создаёт глобальный канал
//
// Provider → кладёт туда данные
//
// useContext → достаёт данные
//
// useAuth → удобная обёртка над useContext