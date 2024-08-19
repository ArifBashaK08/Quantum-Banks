"use client"

import Link from "next/link"
import Image from "next/image"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import BankLogo from "./BankLogo"
import Footer from "./Footer"

const Sidebar = ({ user }: SiderbarProps) => {

    const pathname = usePathname()

    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <BankLogo />
                {sidebarLinks.map(({ imgURL, route, label }) => {

                    const isActive = pathname === route || pathname.startsWith(`${route}/`)

                    return <Link href={route} key={label}
                        className={cn("sidebar-link", {
                            "bg-bank-gradient": isActive
                        })}
                    >
                        <div className="relative size-6">
                            <Image src={imgURL}
                                alt={label}
                                fill
                                className={cn({
                                    "brightness-[3] invert-0": isActive
                                })}
                            />
                        </div>
                        <p className={cn("sidebar-label", {
                            "!text-white": isActive
                        })}>{label}</p>
                    </Link>
                })}
                USER
            </nav>

            <Footer user={user} type={"mobile"}/>
        </section>
    )
}
export default Sidebar