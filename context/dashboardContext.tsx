"use client"
import { createContext, useState, useContext } from "react"

type DashBoardContext = {
  userCurrentAmount: number
  setUserCurrentAmount: (amount: number) => void
}

const DashBoardContext = createContext({
  userCurrentAmount: 0,
  setUserCurrentAmount: () => {},
} as DashBoardContext)
export const DashBoardWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [userCurrentAmount, setUserCurrentAmount] = useState(0)

  return (
    <DashBoardContext.Provider
      value={{
        userCurrentAmount,
        setUserCurrentAmount,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  )
}

export const useDashBoardContext = () => useContext(DashBoardContext)
