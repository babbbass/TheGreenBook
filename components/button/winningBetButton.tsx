"use client"
import { BetType } from "@/components/Bet"
import { Button } from "@/components/ui/button"
import { updateBetStatusInDatabase } from "@/lib/actions/updateProfile"
import { returnOnInvestmentFunc } from "@/lib/calculation"
import { STATUS_LOST, STATUS_WIN } from "@/src/constant"
import { useCapitalGainChartStore } from "@/src/store/capitalGainChartStore"
import { useRoiAndPercentStore } from "@/src/store/roiAndPercentStore"
import clsx from "clsx"
import { BadgeCheck, Loader } from "lucide-react"
import { useTransition } from "react"

export type BetTypeButton = BetType & {
  updateStatus: (arg0: string) => void
  modifying: boolean
}
const updateBetStatus = async (bet: { id: string; userId: string }) => {
  await updateBetStatusInDatabase(bet, STATUS_WIN)
}

export const WinningBetButton = ({
  bet,
  updateStatus,
  modifying,
}: BetTypeButton) => {
  const [isPending, startTransition] = useTransition()
  const { currentAmount, setCurrentAmount, setRoi } = useRoiAndPercentStore()
  const { setUserBetsStore, userBetsStore } = useCapitalGainChartStore()
  const copyCurrentAmount =
    currentAmount > 0 ? currentAmount : bet?.user?.profile?.currentAmount

  return (
    <Button
      className={clsx("bg-white cursor-pointer w-12 sm:w-14", {
        "opacity-20": bet.status === STATUS_LOST,
        "cursor-not-allowed  bg-gray-200 hover:bg-gray-200": !modifying,
      })}
      onClick={() => {
        if (!modifying) {
          return
        }
        startTransition(() => {
          const newCurrentAmount = copyCurrentAmount + bet.amount * bet.odd
          setCurrentAmount(newCurrentAmount)
          const newUserBetsStore = userBetsStore.map((userBet) => {
            if (userBet.id === bet.id) {
              return {
                ...userBet,
                status: STATUS_WIN,
              }
            }
            return userBet
          })
          setUserBetsStore(newUserBetsStore)
          setRoi(
            returnOnInvestmentFunc(
              bet.user.profile.startAmount,
              newCurrentAmount
            )
          )
          updateStatus(STATUS_WIN)
          updateBetStatus(bet)
        })
      }}
    >
      {isPending ? (
        <Loader className='mr-2 h-4 w-4' />
      ) : (
        <BadgeCheck className='text-title' />
      )}
    </Button>
  )
}
