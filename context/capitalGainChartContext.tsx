"use client"
import { createContext, useState, useContext } from "react"

type CapitalGainChartContext = {
  userBetsContext: { amount: number; odd: number; status: string }[]
  setUserBetsContext: (
    userBets: { amount: number; odd: number; status: string }[]
  ) => void
}

const CapitalGainChartContext = createContext({
  userBetsContext: [{ amount: 0, odd: 0, status: "Pending" }],
  setUserBetsContext: () => [{ amount: 0, odd: 0, status: "Pending" }],
} as CapitalGainChartContext)
export const CapitalGainChartWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [userBetsContext, setUserBetsContext] = useState<
    { amount: number; odd: number; status: string }[]
  >([{ amount: 0, odd: 0, status: "Pending" }])
  return (
    <CapitalGainChartContext.Provider
      value={{
        userBetsContext,
        setUserBetsContext,
      }}
    >
      {children}
    </CapitalGainChartContext.Provider>
  )
}

export const useCapitalGainChartContext = () =>
  useContext(CapitalGainChartContext)
