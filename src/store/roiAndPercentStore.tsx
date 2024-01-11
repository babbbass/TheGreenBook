import { create } from "zustand"

type roiAndpercentStore = {
  percentage: number
  roi: number
  currentAmount: number
  setPercentage: (percentage: number) => void
  setRoi: (roi: number) => void
  setCurrentAmount: (currentAmount: number) => void
}

export const useRoiAndPercentStore = create<roiAndpercentStore>((set) => ({
  percentage: 0,
  roi: 0,
  currentAmount: 0,
  setRoi: (roi: number) => set({ roi: roi }),
  setPercentage: (percentage: number) => set({ percentage: percentage }),
  setCurrentAmount: (currentAmount: number) =>
    set({ currentAmount: currentAmount }),
}))
