"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  percentageOnInvestmentFunc,
  returnOnInvestmentFunc,
} from "@/lib/calculation"
import { useRoiAndPercentStore } from "@/src/store/roiAndPercentStore"
import clsx from "clsx"

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
  const profit = currentAmount - startAmount
  return (
    <>
      <Card className='py-4 flex flex-col items-center gap-2'>
        <CardHeader className='w-full flex items-center font-bold text-2xl'>
          <CardTitle>Benefices</CardTitle>
        </CardHeader>
        <div>
          <Badge
            className={clsx(
              { "bg-red-600": profit < 0 },
              `h-20 w-20 flex items-center justify-center rounded-full`
            )}
          >
            <span className='text-xl italic'>{profit}€</span>
          </Badge>
        </div>
        <CardContent className='flex flex-col items-center h-full'>
          <form className='space-y-8 h-full'>
            <div className='flex items-center justify-center h-full flex-col gap-4'>
              <Label className='mb-2 font-semibold text-xl'>
                Retour sur investissement
              </Label>
              {/* <Badge
                className={clsx(
                  { "bg-orange-600": returnOnInvestment < 0 },
                  { "bg-red-600": returnOnInvestment < -50 },
                  `h-20 w-20 flex items-center justify-center rounded-full`
                )}
              > */}
              <span
                className={clsx(
                  { "text-orange-600": returnOnInvestment < 0 },
                  { "text-red-600": returnOnInvestment < -50 },
                  `font-bold text-xl text-green-700`
                )}
              >
                {returnOnInvestment}%
              </span>
              {/* </Badge> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
