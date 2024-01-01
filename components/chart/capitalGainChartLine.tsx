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
import { Card } from "@/components/ui/card"

type CapitalGainChartLineProps = {
  startAmount: number
  userBets: { amount: number; odd: number; status: string }[]
}

const updateMyAmountGrowth = (status: string, amount: number, odd: number) => {
  if (status === "Won") return amount * odd
  if (status === "Pending") return -amount
  return 0
}

export const CapitalGainChartLine = ({
  startAmount,
  userBets,
}: CapitalGainChartLineProps) => {
  const myAmountGrowth = [{ name: 0, amount: startAmount }]
  let startAmountCopy = startAmount
  const data = userBets.map(({ amount, odd, status }) => {
    startAmountCopy += updateMyAmountGrowth(status, amount, odd)
    myAmountGrowth.push({
      name: myAmountGrowth.length,
      amount: startAmountCopy,
    })
    return { amount, odd, status }
  })

  return (
    <Card className='flex flex-col items-center p-2 bg-slate-50'>
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
          stroke='#218358'
          activeDot={{ r: 8 }}
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
