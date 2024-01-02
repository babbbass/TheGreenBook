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
            <div className='flex flex-col gap-4'>
              <Label className='ml-2 font-semibold'>Mon ROI</Label>
              <Badge className='h-10 flex items-center justify-center'>
                {returnOnInvestment}
              </Badge>
            </div>
            <div className='flex flex-col gap-4'>
              <Label className='ml-2 font-semibold'>% de gain</Label>
              <Badge className='h-10 flex items-center justify-center'>
                {percentageOnInvestment}
              </Badge>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
