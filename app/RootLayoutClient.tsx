"use client"
import { Header } from "@/widgets/header/ui/Header";
import styles from "./rootLayout.module.scss";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";
import { SnackbarProvider } from "@/widgets/snackbar/model/snackbar.provider";
import { usePathname } from 'next/navigation';


type Props = {
    children: React.ReactNode
}

export const RootLayoutClient = ({ children }: Props) => {
    const pathname = usePathname()
    const isAuthPage = pathname === '/'

    return (
        <SnackbarProvider>
            <Header />
            <div className={styles.layout}>
                {!isAuthPage && <Sidebar />}
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </SnackbarProvider>
    )
}
