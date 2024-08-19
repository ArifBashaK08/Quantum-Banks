import RightSidebar from "@/components/RightSidebar"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import HeaderBox from "@/components/ui/HeaderBox"
import { getLoggedInUser } from "@/lib/actions/user.actions"

const Home = async() => {

  const loggedIn = await getLoggedInUser()


  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome" user={loggedIn?.name.split(" ")[0] || "Guest"}
            subtext="Access and manage your account and transactions efficiently"
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={2357}
          />
        </header>

        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 524.46}, { currentBalance: 1042.64 }]}
      />
    </section>
  )
}
export default Home