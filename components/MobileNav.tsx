"use client"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { sidebarLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Footer from "./Footer"

const MobileNav = ({ user }: MobileNavProps) => {
    const pathname = usePathname()

    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={"/icons/hamburger.svg"}
                        width={30} height={30}
                        alt="Menu"
                        className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent side={"left"}
                    className="border-none bg-white"
                >
                    <nav className="flex flex-col gap-4">
                        <Link href="/"
                            className="cursor-pointer flex items-center gap-1 px-4"
                        >
                            <Image
                                src={"/icons/logo.svg"}
                                width={34} height={34}
                                alt="Quantum Banks Logo"
                            />
                            <h1 className="sidebar-logo text-26 font-ibm-plex-serif font-bold text-black-1">
                                Quantum Banks
                            </h1>
                        </Link>
                        <div className="mobilenav-sheet">
                            <SheetClose asChild>
                                <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                                    {sidebarLinks.map(({ imgURL, route, label }) => {
                                        const isActive = pathname === route || pathname.startsWith(`${route}/`)


                                        return <SheetClose asChild key={label}>
                                            <Link href={route}
                                                className={cn("mobilenav-sheet_close w-full", {
                                                    "bg-bank-gradient": isActive
                                                })}
                                            >
                                                <Image src={imgURL}
                                                    alt={label}
                                                    width={20}
                                                    height={20}
                                                    className={cn({
                                                        "brightness-[3] invert-0": isActive
                                                    })}
                                                />

                                                <p className={cn("text-16 font-semibold text-black-2", {
                                                    "text-white": isActive
                                                })}>{label}</p>
                                            </Link>
                                        </SheetClose>
                                    })}
                                    USER
                                </nav>
                            </SheetClose>
                            <Footer user={user} type="mobile" />
                        </div>
                        USER
                    </nav>
                </SheetContent>

            </Sheet>
        </section>
    )
}
export default MobileNav