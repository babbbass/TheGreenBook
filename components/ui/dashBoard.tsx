"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import {
  returnOnInvestmentFunc,
  percentageOnInvestmentFunc,
} from "@/lib/calculation"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useDashBoardContext } from "@/context/dashboardContext"
import clsx from "clsx"

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
      <Card className='py-4 flex flex-col items-center gap-4'>
        <CardHeader className='w-full flex items-center font-bold text-2xl'>
          <CardTitle>Benefices</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-8'>
            <div className='flex items-center flex-col gap-4'>
              <Label className='ml-2 font-semibold text-xl'>Mon ROI</Label>
              <Badge
                className={clsx(
                  { "bg-orange-600": percentageOnInvestment < 0 },
                  { "bg-red-600": percentageOnInvestment < -50 },
                  `h-20 w-20 flex items-center justify-center rounded-full`
                )}
              >
                <span className='text-xl'>{returnOnInvestment}%</span>
              </Badge>
            </div>
            <div className='flex items-center flex-col gap-4'>
              <Label className='ml-2 font-semibold text-xl'>% de gain</Label>
              <Badge
                className={clsx(
                  { "bg-orange-600": percentageOnInvestment < 0 },
                  { "bg-red-600": percentageOnInvestment < -50 },
                  `h-20 w-20 flex items-center justify-center rounded-full`
                )}
              >
                <span className='text-xl'>{percentageOnInvestment}%</span>
              </Badge>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
