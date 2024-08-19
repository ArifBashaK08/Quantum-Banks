import Link from "next/link"
import Image from "next/image"

const BankLogo = () => {
    return (
        <Link href="/"
            className="mb-12 cursor-pointer flex items-center gap-2"
        >
            <Image
                src={"/icons/logo.svg"}
                width={34} height={34}
                alt="Quantum Banks Logo"
                className="size-[24px] max-xl:size-14"
            />
            <h1 className="sidebar-logo">
                Quantum Banks
            </h1>
        </Link>
    )
}
export default BankLogo