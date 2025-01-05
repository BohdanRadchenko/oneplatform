
import { FC } from "react"
import { ModeToggle } from "./ModeToggle"
import { Link } from "react-router-dom"
import { UserNav } from "./UserNav"

export const NLTSiteHeader: FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <Link to="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
                        <span className="hidden font-bold lg:inline-block">
                            NLTDev
                        </span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center">
                        <ModeToggle />
                        <UserNav />
                    </nav>
                </div>
            </div>
        </header>
    )
}
