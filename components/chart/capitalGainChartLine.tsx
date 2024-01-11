"use client"
import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
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
  const { userBetsContext } = useCapitalGainChartContext()
  const userBetsToDisplay =
    userBetsContext.length > userBets.length ? userBetsContext : userBets

  const myAmountGrowth = [{ name: 0, montant_actuel: startAmount }]
  let startAmountCopy = startAmount

  userBetsToDisplay.map(({ amount, odd, status }) => {
    startAmountCopy += updateMyAmountGrowth(status, amount, odd)
    myAmountGrowth.push({
      name: myAmountGrowth.length,
      montant_actuel: startAmountCopy,
      // id: index,
    })
    return { amount, odd, status }
  })

  return (
    <Card className='flex flex-col items-center p-2'>
      <CardHeader className='w-full flex items-center font-bold text-2xl'>
        <CardTitle className='italic'>Votre Courbe</CardTitle>
      </CardHeader>
      <ResponsiveContainer width='100%' height={360}>
        <LineChart
          className='w-full'
          width={300}
          height={360}
          data={myAmountGrowth}
          margin={{
            top: 5,
            right: 40,
            left: 0,
            bottom: 5,
          }}
        >
          <Line
            type='monotone'
            dataKey='montant_actuel'
            stroke='#193B2D'
            activeDot={{ r: 8 }}
          />
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
