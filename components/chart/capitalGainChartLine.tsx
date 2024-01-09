"use client"
import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useCapitalGainChartContext } from "@/context/capitalGainChartContext"

type CapitalGainChartLineProps = {
  startAmount: number
  userBets: { amount: number; odd: number; status: string }[]
}

const updateMyAmountGrowth = (status: string, amount: number, odd: number) => {
  if (status === "Won") return amount * odd
  return -amount
}

export const CapitalGainChartLine = ({
  startAmount,
  userBets,
}: CapitalGainChartLineProps) => {
  const { userBetsContext, setUserBetsContext } = useCapitalGainChartContext()
  const userBetsToDisplay =
    userBetsContext.length > userBets.length ? userBetsContext : userBets

  const myAmountGrowth = [{ name: 0, amount: startAmount, id: 0 }]
  let startAmountCopy = startAmount

  userBetsToDisplay.map(({ amount, odd, status }, index) => {
    startAmountCopy += updateMyAmountGrowth(status, amount, odd)
    myAmountGrowth.push({
      name: myAmountGrowth.length,
      amount: startAmountCopy,
      id: index,
    })
    return { amount, odd, status }
  })

  return (
    <Card className='flex flex-col items-center p-2'>
      <CardHeader className='w-full flex items-center font-bold text-2xl'>
        <CardTitle className='italic'>Votre Courbe</CardTitle>
      </CardHeader>
      <LineChart
        width={450}
        height={300}
        data={myAmountGrowth}
        margin={{
          top: 5,
          right: 10,
          left: 5,
          bottom: 5,
        }}
      >
        <Line
          type='monotone'
          dataKey='amount'
          stroke='#193B2D'
          //activeDot={{ r: 8 }}
        />
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='5 5' />
        <Tooltip />
        {/* <Legend /> */}
      </LineChart>
    </Card>
  )
}
