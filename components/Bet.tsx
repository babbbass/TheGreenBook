"use client"
import { WinningBetButton } from "@/components/button/winningBetButton"
import { LosingBetButton } from "@/components/button/losingBetButton"
import { useState } from "react"
import { clsx } from "clsx"

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

type Bet = {
  bet: {
    id: string
    userId: string
    amount: number
    odd: number
    status: string
    createdAt: Date
  }
}

export const Bet = ({ bet }: Bet) => {
  const [betStatus, setBetStatus] = useState(bet.status)
  return (
    <div
      className={clsx(
        {
          "border-red-500": betStatus === "Lost",
          "border-title": betStatus === "Won",
        },
        "border-2 mb-2 p-2 flex gap-4 items-center"
      )}
    >
      <div className={"flex flex-col items-center justify-center px-2"}>
        <span className='font-bold'>Mise</span>
        <span>{bet.amount}€</span>
      </div>
      <div className='flex flex-col items-center'>
        <span className='font-bold'>Côte</span>
        <span>{bet.odd}</span>
      </div>
      <div className='flex flex-col items-center'>
        <span className='font-bold'>Status</span>
        <span
          className={clsx({
            "text-red-500 font-semibold": betStatus === "Lost",
            "text-title font-semibold": betStatus === "Won",
          })}
        >
          {betStatus}
        </span>
      </div>
      <div className='flex flex-col items-center'>
        <span className='font-bold'>Date</span>
        <span>{formatDate(bet.createdAt)}</span>
      </div>
      <div className='flex gap-4 items-center'>
        <WinningBetButton
          bet={bet}
          betStatus={betStatus}
          updateStatus={setBetStatus}
        />
        <LosingBetButton
          bet={bet}
          betStatus={betStatus}
          updateStatus={setBetStatus}
        />
      </div>
    </div>
  )
}