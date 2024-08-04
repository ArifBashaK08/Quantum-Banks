import RightSidebar from "@/components/RightSidebar"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import HeaderBox from "@/components/ui/HeaderBox"

const Home = () => {

  const loggedIn = {
    firstName: "Arif",
    lastName: "Kolimi",
    email: "arifbasha552@gmail.com"
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome" user={loggedIn?.firstName || "Guest"}
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
        banks={[{ currentBalance: 524.46 }, { currentBalance: 1042.64 }]}
      />
    </section>
  )
}
export default Home