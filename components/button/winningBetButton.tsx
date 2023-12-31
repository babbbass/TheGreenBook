"use client"
import { Button } from "@/components/ui/button"
import { BadgeCheck } from "lucide-react"
import { updateBetStatusInDatabase } from "@/lib/actions/updateProfile"
import clsx from "clsx"

export const STATUSLOST = "Lost"
export const STATUSWIN = "Won"
export type Bet = {
  bet: {
    id: string
    userId: string
  }
  betStatus: string
  updateStatus: (arg0: string) => void
}
const updateBetStatus = async (bet: { id: string; userId: string }) => {
  await updateBetStatusInDatabase(bet, STATUSWIN)
}

export const WinningBetButton = ({ bet, betStatus, updateStatus }: Bet) => {
  return (
    <Button
      className={clsx("bg-white cursor-pointer", {
        "opacity-20": betStatus === STATUSLOST,
        "cursor-not-allowed  bg-gray-200":
          betStatus === STATUSLOST || STATUSWIN,
      })}
      onClick={() => {
        if (betStatus === STATUSLOST || STATUSWIN) {
          return
        }
        updateStatus(STATUSWIN)
        updateBetStatus(bet)
      }}
    >
      <BadgeCheck className='text-title' />
    </Button>
  )
}
