"use client"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { updateBetStatusInDatabase } from "@/lib/actions/updateProfile"
import clsx from "clsx"
import { STATUS_LOST, STATUS_WIN } from "@/src/constant"
import { BetType } from "@/components/button/winningBetButton"

const updateBetStatus = async (bet: { id: string; userId: string }) => {
  await updateBetStatusInDatabase(bet, STATUS_LOST)
}

export const LosingBetButton = ({ bet, updateStatus, modifying }: BetType) => {
  return (
    <Button
      className={clsx("bg-white cursor-pointer w-12 sm:w-14", {
        "opacity-20": bet.status === STATUS_WIN,
        "cursor-not-allowed bg-gray-200 hover:bg-gray-200": !modifying,
      })}
      onClick={() => {
        if (!modifying) {
          return
        }
        updateBetStatus(bet)
        updateStatus(STATUS_LOST)
      }}
    >
      <XCircle className='text-red-500' />
    </Button>
  )
}
