"use client"
import { Header } from "@/widgets/header/ui/Header";
import styles from "./rootLayout.module.scss";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";
import { SnackbarProvider } from "@/widgets/snackbar/model/snackbar.provider";
import { usePathname, useSearchParams } from 'next/navigation';
import {ModalProvider} from "@/widgets/modal/model/modal.provider";

import { AuthProvider, useAuth } from "@/shared/auth/authContext";
import {Suspense} from "react";

type Props = {
    children: React.ReactNode
}

const LayoutContent = ({ children }: Props) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { isLoggedIn } = useAuth()
    const isAuthPage = pathname === '/admin/login'
    const isUserDetailsPage = pathname === '/admin/users' && !!searchParams?.get('userId')

    return (
        <SnackbarProvider>
            <ModalProvider>
                <Header />
                <div className={styles.layout}>
                    {!isAuthPage && !isUserDetailsPage && isLoggedIn && <Sidebar />}
                    <main className={`${styles.main} ${isAuthPage ? styles.centered : ''}`}>
                        {children}
                    </main>
                </div>
            </ModalProvider>
        </SnackbarProvider>
    )
}

export const RootLayoutClient = ({ children }: Props) => {
    return (
        <AuthProvider>
            <Suspense fallback={null}>
                <LayoutContent>{children}</LayoutContent>
            </Suspense>
        </AuthProvider>
    )
}
