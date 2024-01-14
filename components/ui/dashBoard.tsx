"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  returnOnInvestmentFunc,
  percentageOnInvestmentFunc,
} from "@/lib/calculation"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import clsx from "clsx"
import { useRoiAndPercentStore } from "@/src/store/roiAndPercentStore"

type DashBoard = {
  currentAmount: number
  startAmount: number
}
export const DashBoard = ({ currentAmount, startAmount }: DashBoard) => {
  const { percentage, roi } = useRoiAndPercentStore()
  const returnOnInvestment =
    roi !== 0 ? roi : returnOnInvestmentFunc(startAmount, currentAmount)
  const percentageOnInvestment =
    percentage !== 0
      ? percentage
      : percentageOnInvestmentFunc(startAmount, currentAmount)

  return (
    <>
      <Card className='py-4 flex flex-col items-center gap-4'>
        <CardHeader className='w-full flex items-center font-bold text-2xl'>
          <CardTitle>Benefices</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col items-center h-full'>
          <form className='space-y-8 h-full'>
            <div className='flex items-center justify-center h-full flex-col gap-4'>
              <Label className='mb-6 font-semibold text-xl'>
                Retour sur investissement
              </Label>
              <Badge
                className={clsx(
                  { "bg-orange-600": returnOnInvestment < 0 },
                  { "bg-red-600": returnOnInvestment < -50 },
                  `h-20 w-20 flex items-center justify-center rounded-full`
                )}
              >
                <span className='text-xl'>{returnOnInvestment}%</span>
              </Badge>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
