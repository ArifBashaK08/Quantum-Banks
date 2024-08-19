import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = ({ user, type = "desktop" }: FooterProps) => {

  const router = useRouter()
  const handleLogOut = async () => {
    try {
      await logoutAccount();
      router.push("/sign-in"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-blue-950">{user?.name[0]}</p>
      </div>
      <div className={type === "mobile" ? "footer_email-mobile" : "footer_email"}>
        <h1 className="font-semibold text-gray-700 truncate">{user?.name}</h1>
        <p className="text-10 truncate font-semibold text-gray-500">{user?.email}</p>
      </div>
      <div className="footer_image" onClick={handleLogOut}>
        <Image src="icons/logout.svg" alt="jsm" fill />
      </div>
    </footer>
  )
}
export default Footer