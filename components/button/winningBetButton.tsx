"use client"
import { Button } from "@/components/ui/button"
import { BadgeCheck } from "lucide-react"
import { updateBetStatusInDatabase } from "@/lib/actions/updateProfile"
import { useTransition } from "react"
import clsx from "clsx"
import { Loader } from "lucide-react"

export const STATUSLOST = "Lost"
export const STATUSWIN = "Won"
export type Bet = {
  bet: {
    id: string
    userId: string
  }
  betStatus: string
  updateStatus: (arg0: string) => void
  modifying: boolean
}
const updateBetStatus = async (bet: { id: string; userId: string }) => {
  await updateBetStatusInDatabase(bet, STATUSWIN)
}

export const WinningBetButton = ({
  bet,
  betStatus,
  updateStatus,
  modifying,
}: Bet) => {
  const [isPending, startTransition] = useTransition()
  return (
    <Button
      className={clsx("bg-white cursor-pointer w-12 sm:w-14", {
        "opacity-20": betStatus === STATUSLOST,
        "cursor-not-allowed  bg-gray-200 hover:bg-gray-200": !modifying,
      })}
      onClick={() => {
        if (!modifying) {
          return
        }
        startTransition(() => {
          updateStatus(STATUSWIN)
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
