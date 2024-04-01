import { create } from "zustand"

type capitalGainChartStore = {
  userBetsStore: {
    id: string | undefined
    amount: number
    odd: number
    status: string
  }[]
  setUserBetsStore: (
    userBets: {
      id: string | undefined
      amount: number
      odd: number
      status: string
    }[]
  ) => void
}

export const useCapitalGainChartStore = create<capitalGainChartStore>()(
  (set) => ({
    userBetsStore: [{ id: "", amount: 0, odd: 0, status: "Pending" }],
    setUserBetsStore: (userBetsStore) => set({ userBetsStore }),
  })
)
