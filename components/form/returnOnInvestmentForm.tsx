"use client"
// import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { DashBoard } from "../ui/dashBoard"
import { updateProfileUser } from "@/lib/actions/updateProfile"
import { Card, CardHeader } from "../ui/card"

// const formSchema = z.object({
//   startAmount: z.coerce.number().min(1),
//   currentAmount: z.coerce.number().min(1),
// })

export type Amounts = {
  startAmount: number
  currentAmount: number
}

const formatMyNumber = (myNumber: number) => {
  const newNumber = parseFloat(myNumber.toFixed(2))
  return newNumber
}

const returnOnInvestmentFunc = (startAmount: number, currentAmount: number) => {
  if (startAmount <= 0) return 0
  const capitalGain = currentAmount - startAmount
  const returnOnInvestment = (capitalGain / currentAmount) * 100

  return formatMyNumber(returnOnInvestment)
}

const percentageOnInvestmentFunc = (
  startAmount: number,
  currentAmount: number
) => {
  if (startAmount <= 0) return 0
  const capitalGain = currentAmount - startAmount
  const percentageOnInvestment = (capitalGain / startAmount) * 100
  return formatMyNumber(percentageOnInvestment)
}

export const ReturnOnInvestmentForm = ({
  startAmount,
  currentAmount,
}: Amounts) => {
  const [returnOnInvestment, setReturnOnInvestment] = useState(
    returnOnInvestmentFunc(startAmount, currentAmount)
  )
  const [percentageOnInvestment, setPercentageOnInvestment] = useState(
    percentageOnInvestmentFunc(startAmount, currentAmount)
  )

  async function handleSubmit(formData: FormData) {
    console.log("action")
    const startAmount = Number(formData.get("startAmount"))
    const currentAmount = Number(formData.get("currentAmount"))

    setReturnOnInvestment(returnOnInvestmentFunc(startAmount, currentAmount))
    setPercentageOnInvestment(
      percentageOnInvestmentFunc(startAmount, currentAmount)
    )

    await updateProfileUser(startAmount, currentAmount)
  }

  return (
    <>
      <Card className='p-4'>
        <CardHeader className='w-full flex items-center font-bold text-2xl'>
          Vos montants
        </CardHeader>
        <form action={handleSubmit} className='space-y-8'>
          <Input
            name='startAmount'
            placeholder={`${startAmount}`}
            defaultValue={startAmount}
          />
          <Input
            name='currentAmount'
            placeholder={`${currentAmount}`}
            defaultValue={currentAmount}
          />
          <div className='flex flex-row-reverse w-full'>
            <Button type='submit'>Mon ROI</Button>
          </div>
        </form>
      </Card>
      <DashBoard
        returnOnInvestment={returnOnInvestment}
        percentageOnInvestment={percentageOnInvestment}
      />
    </>
  )
}
