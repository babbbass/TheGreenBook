"use client"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { updateBetStatusInDatabase } from "@/lib/actions/updateProfile"
import clsx from "clsx"
import { STATUSLOST, STATUSWIN } from "@/components/button/winningBetButton"

export type Bet = {
  bet: {
    id: string
    userId: string
  }
  betStatus: string
  updateStatus: (arg0: string) => void
}
const updateBetStatus = async (bet: { id: string; userId: string }) => {
  await updateBetStatusInDatabase(bet, STATUSLOST)
}

export const LosingBetButton = ({ bet, betStatus, updateStatus }: Bet) => {
  return (
    <Button
      className={clsx("bg-white cursor-pointer", {
        "opacity-20": betStatus === STATUSWIN,
        "cursor-not-allowed bg-gray-200": betStatus === STATUSLOST || STATUSWIN,
      })}
      onClick={() => {
        if (betStatus === STATUSLOST || STATUSWIN) {
          return
        }
        updateBetStatus(bet)
        updateStatus(STATUSLOST)
      }}
    >
      <XCircle className='text-red-500' />
    </Button>
  )
}
