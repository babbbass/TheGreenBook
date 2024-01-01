"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import {
  returnOnInvestmentFunc,
  percentageOnInvestmentFunc,
} from "@/lib/calculation"
import { useDashBoardContext } from "@/context/dashboardContext"

type DashBoard = {
  currentAmount: number
  startAmount: number
}
export const DashBoard = ({ currentAmount, startAmount }: DashBoard) => {
  const { userCurrentAmount } = useDashBoardContext()
  const [returnOnInvestment, setReturnOnInvestment] = useState(
    returnOnInvestmentFunc(startAmount, currentAmount)
  )
  const [percentageOnInvestment, setPercentageOnInvestment] = useState(
    percentageOnInvestmentFunc(startAmount, currentAmount)
  )

  useEffect(() => {
    if (userCurrentAmount <= 0) return
    setReturnOnInvestment(
      returnOnInvestmentFunc(startAmount, userCurrentAmount)
    )
    setPercentageOnInvestment(
      percentageOnInvestmentFunc(startAmount, userCurrentAmount)
    )
  }, [userCurrentAmount, startAmount])

  return (
    <>
      <Card className='flex flex-col items-center my-6'>
        <CardHeader>
          <CardTitle>Mon Tableau de bord</CardTitle>
        </CardHeader>
        <CardContent className='flex gap-2 w-full justify-around'>
          <div className='flex flex-col items-center'>
            <h3>Mon ROI</h3>
            <p>{returnOnInvestment}</p>
          </div>
          <div className='flex flex-col items-center'>
            <h3>% de gain</h3>
            <p>{percentageOnInvestment}</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
