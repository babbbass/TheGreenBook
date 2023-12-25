"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { enterBetInDatabase } from "@/lib/actions/updateProfile"
import { useDashBoardContext } from "@/context/dashboardContext"

type BettingFormData = {
  currentAmountFromDatabase: number
}
export const BettingForm = ({ currentAmountFromDatabase }: BettingFormData) => {
  const { userCurrentAmount, setUserCurrentAmount } = useDashBoardContext()

  async function handleSubmit(formData: FormData) {
    await enterBetInDatabase(
      Number(formData.get("amount")),
      Number(formData.get("odd"))
    )
    const currentAmount =
      currentAmountFromDatabase - Number(formData.get("amount"))
    setUserCurrentAmount(currentAmount)
  }

  return (
    <Card className=' py my-4 flex flex-col items-center gap-4'>
      <CardHeader className='font-bold'>Mon pari</CardHeader>
      <CardContent>
        <form action={handleSubmit} className='space-y-8'>
          <div className='flex flex-col gap-2'>
            <Label className='ml-2 font-semibold' htmlFor='amount'>
              Montant
            </Label>
            <Input placeholder='0' name='amount' />
          </div>
          <div className='flex flex-col gap-2'>
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
