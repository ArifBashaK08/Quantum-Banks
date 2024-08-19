import AuthForm from "@/components/AuthForm"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"

const SignIn = async() => {
  const loggedInUser = await getLoggedInUser()

  loggedInUser && redirect("/")

  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  )
}
export default SignIn