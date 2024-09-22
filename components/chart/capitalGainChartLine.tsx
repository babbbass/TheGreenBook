"use client"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useCapitalGainChartStore } from "@/src/store/capitalGainChartStore"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type CapitalGainChartLineProps = {
  startAmount: number
  userBets: { amount: number; odd: number; status: string }[]
}

const updateMyAmountGrowth = (status: string, amount: number, odd: number) => {
  if (status === "Won") {
    const amountToAdd = amount * odd - amount
    return amountToAdd
  }

  return -amount
}

export const CapitalGainChartLine = ({
  startAmount,
  userBets,
}: CapitalGainChartLineProps) => {
  const { userBetsStore } = useCapitalGainChartStore()
  const userBetsToDisplay =
    userBetsStore.length > userBets.length ? userBetsStore : userBets

  const myAmountGrowth = [{ name: 0, montant_actuel: startAmount }]
  let amountCopy = startAmount

  userBetsToDisplay.map(({ amount, odd, status }) => {
    amountCopy += updateMyAmountGrowth(status, amount, odd)
    myAmountGrowth.push({
      name: myAmountGrowth.length,
      montant_actuel: amountCopy,
    })
    return { amount, odd, status }
  })

  return (
    <Card className='flex flex-col mx-2 items-center p-2'>
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
