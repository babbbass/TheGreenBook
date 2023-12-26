"use client"
import { Button } from "@/components/ui/button"
import { BadgeCheck } from "lucide-react"

const winningBet = () => {
  console.log("validation")
}
export const WinningBetButton = () => {
  return (
    <Button className='bg-white' onClick={winningBet}>
      <BadgeCheck className='text-green-500' />
    </Button>
  )
}
