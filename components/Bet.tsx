"use client"
import { WinningBetButton } from "@/components/button/winningBetButton"
import { LosingBetButton } from "@/components/button/losingBetButton"
import { useState } from "react"
import { clsx } from "clsx"
import { Card } from "./ui/card"
import { WrenchButton } from "./button/wrenchButton"
import { STATUS_LOST, STATUS_PENDING, STATUS_WIN } from "@/src/constant"

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export type BetType = {
  bet: {
    id: string
    userId: string
    amount: number
    odd: number
    status: string
    createdAt: Date
    user: {
      profile: {
        currentAmount: number
        startAmount: number
      }
    }
  }
}

export const Bet = ({ bet }: BetType) => {
  const [betStatus, setBetStatus] = useState(bet.status)
  const [modifyingBet, setModifyingBet] = useState(false)

  return (
    <>
      <Card
        className={clsx(
          {
            "border-red-500": betStatus === STATUS_LOST,
            "border-title": betStatus === STATUS_WIN,
          },
          "border-2 mb-2 p-2 flex gap-2 items-center rounded-lg text-sm min-[500px]:text-base"
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
              "text-red-500 font-semibold": betStatus === STATUS_LOST,
              "text-title font-semibold": betStatus === STATUS_WIN,
            })}
          >
            {betStatus}
          </span>
        </div>
        <div className='hidden min-[420px]:flex flex-col items-center '>
          <span className='font-bold'>Date</span>
          <span>{formatDate(bet.createdAt)}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <WinningBetButton
            bet={bet}
            updateStatus={setBetStatus}
            modifying={betStatus === STATUS_PENDING ? true : modifyingBet}
          />
          <LosingBetButton
            bet={bet}
            updateStatus={setBetStatus}
            modifying={betStatus === STATUS_PENDING ? true : modifyingBet}
          />
        </div>
        {betStatus !== STATUS_PENDING && (
          <WrenchButton
            modifying={modifyingBet}
            setModifying={setModifyingBet}
          />
        )}
      </Card>
    </>
  )
}
