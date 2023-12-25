"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { DashBoard } from "../ui/dashBoard"
import { updateProfileUser } from "@/lib/actions/updateProfile"
import { Card, CardHeader } from "../ui/card"
import { useDashBoardContext } from "@/context/dashboardContext"

export type Amounts = {
  startAmount: number
  currentAmountFromDatabase: number
}
export const ReturnOnInvestmentForm = ({
  startAmount,
  currentAmountFromDatabase,
}: Amounts) => {
  const { userCurrentAmount } = useDashBoardContext()
  async function handleSubmit(formData: FormData) {
    const startAmount = Number(formData.get("startAmount"))
    const currentAmount = Number(formData.get("currentAmount"))

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
            placeholder={`${currentAmountFromDatabase}`}
            defaultValue={
              userCurrentAmount > 0
                ? userCurrentAmount
                : currentAmountFromDatabase
            }
          />
          <div className='flex flex-row-reverse w-full'>
            <Button type='submit'>Mon ROI</Button>
          </div>
        </form>
      </Card>
      <DashBoard
        currentAmount={
          userCurrentAmount > 0 ? userCurrentAmount : currentAmountFromDatabase
        }
        startAmount={startAmount}
      />
    </>
  )
}
