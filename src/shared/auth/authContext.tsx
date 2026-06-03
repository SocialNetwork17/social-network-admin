'use client'

import {createContext, useContext, useEffect, useState} from 'react'

const AUTH_STORAGE_KEY = 'admin-authenticated'

type AuthContextType = {
    isLoggedIn: boolean
    isAuthResolved: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    isAuthResolved: false,
    login: () => {
    },
    logout: () => {
    },
})

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAuthResolved, setIsAuthResolved] = useState(false)

    useEffect(() => {
        const persistedAuthState = window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true'

        setIsLoggedIn(persistedAuthState)
        setIsAuthResolved(true)
    }, [])

    const login = () => {
        window.localStorage.setItem(AUTH_STORAGE_KEY, 'true')
        setIsLoggedIn(true)
    }

    const logout = () => {
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, isAuthResolved, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
