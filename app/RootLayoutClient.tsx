"use client"
import { Header } from "@/widgets/header/ui/Header";
import styles from "./rootLayout.module.scss";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";
import { SnackbarProvider } from "@/widgets/snackbar/model/snackbar.provider";


type Props = {
    children: React.ReactNode
}

export const RootLayoutClient = ({ children }: Props) => {

    return (
        <SnackbarProvider>
            <Header />
            <div className={styles.layout}>
                <Sidebar />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </SnackbarProvider>
    )
}