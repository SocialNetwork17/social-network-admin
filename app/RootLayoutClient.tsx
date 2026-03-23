"use client"
import { Header } from "@/widgets/header/ui/Header";
import styles from "./rootLayout.module.scss";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";
import { SnackbarProvider } from "@/widgets/snackbar/model/snackbar.provider";
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from "@/shared/auth/authContext";

type Props = {
    children: React.ReactNode
}

const LayoutContent = ({ children }: Props) => {
    const pathname = usePathname()
    const { isLoggedIn } = useAuth()
    const isAuthPage = pathname === '/'

    return (
        <SnackbarProvider>
            <Header />
            <div className={styles.layout}>
                {!isAuthPage && isLoggedIn && <Sidebar />}
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </SnackbarProvider>
    )
}

export const RootLayoutClient = ({ children }: Props) => {
    return (
        <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
    )
}
