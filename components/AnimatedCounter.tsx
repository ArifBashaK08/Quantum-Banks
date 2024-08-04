"use client"

import CountUp from "react-countup"

const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (
        <div className="w-full">
            <CountUp 
            decimals={2}
            prefix="₹" 
            end={amount}
            duration={3} />
        </div>
    )
}
export default AnimatedCounter