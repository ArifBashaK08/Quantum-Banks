import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {

  const loggedin = await getLoggedInUser()

  return (

    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedin} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
            src={"/icons/logo.svg"}
            width={30} height={30}
            alt="Icon"
          />
          <div className="">
            <MobileNav user={loggedin} />
          </div>
        </div>
        {children}
      </div>
    </main>

  );
}
