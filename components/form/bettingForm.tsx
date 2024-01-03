"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { enterBetInDatabase, fetchUserBets } from "@/lib/actions/updateProfile"
import { useDashBoardContext } from "@/context/dashboardContext"
import { useCapitalGainChartContext } from "@/context/capitalGainChartContext"
import { useRef } from "react"
type BettingFormData = {
  currentAmountFromDatabase: number
}
export const BettingForm = ({ currentAmountFromDatabase }: BettingFormData) => {
  const { setUserCurrentAmount } = useDashBoardContext()
  const { setUserBetsContext, userBetsContext } = useCapitalGainChartContext()
  const ref = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    const currentAmount =
      currentAmountFromDatabase - Number(formData.get("amount"))
    setUserCurrentAmount(currentAmount)

    const userBets = await fetchUserBets()
    setUserBetsContext([
      ...userBets,
      {
        amount: Number(formData.get("amount")),
        odd: Number(formData.get("odd")),
        status: "Pending",
      },
    ])

    await enterBetInDatabase(
      Number(formData.get("amount")),
      Number(formData.get("odd"))
    )
    ref.current?.reset()
  }

  return (
    <Card className='py-4 flex flex-col items-center gap-4'>
      <CardHeader className='w-full flex items-center font-bold text-2xl'>
        <CardTitle> Mon pari</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={ref} action={handleSubmit} className='space-y-8'>
          <div className='flex flex-col gap-4'>
            <Label className='ml-2 font-semibold' htmlFor='amount'>
              Montant
            </Label>
            <Input placeholder='0' name='amount' />
          </div>
          <div className='flex flex-col gap-4'>
            <Label className='ml-2 font-semibold' htmlFor='odd'>
              Côte
            </Label>
            <Input placeholder='0' name='odd' />
          </div>
          <div className='w-full flex flex-row-reverse'>
            <Button type='submit' className='flex'>
              Parier
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
