"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { updateProfileUser } from "@/lib/actions/updateProfile"
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card"
import { useDashBoardContext } from "@/context/dashboardContext"
import { useState } from "react"
import { Wrench } from "lucide-react"

export type Amounts = {
  startAmount: number
  currentAmountFromDatabase: number
}
export const ReturnOnInvestmentForm = ({
  startAmount,
  currentAmountFromDatabase,
}: Amounts) => {
  const { userCurrentAmount, setUserCurrentAmount } = useDashBoardContext()
  const [modifying, setModifying] = useState(false)
  if (startAmount === 0) setModifying(true)
  async function handleSubmit(formData: FormData) {
    if (!modifying) return
    const startAmount = Number(formData.get("startAmount"))
    const currentAmount = Number(formData.get("currentAmount"))

    setUserCurrentAmount(currentAmount)
    await updateProfileUser(startAmount, currentAmount)
  }

  return (
    <>
      <Card className='py-4 mx-2 w-full flex flex-col items-center gap-4 sm:mb-4 sm:flex-row md:w-3/4'>
        <CardHeader className='font-bold text-2xl'>
          <CardTitle className='text-title'>Montants</CardTitle>
        </CardHeader>
        <CardContent className='w-full'>
          <form
            action={handleSubmit}
            className='flex flex-col gap-8 sm:flex-row '
          >
            <div className='flex flex-col items-stretch w-5/6 gap-8 sm:flex-row'>
              <div className='flex flex-col gap-4'>
                <Label
                  className='m-auto font-semibold text-title text-lg'
                  htmlFor='amount'
                >
                  demarrage
                </Label>
                <Input
                  type='number'
                  name='startAmount'
                  min={0}
                  max={1000000}
                  placeholder={`${startAmount}`}
                  defaultValue={startAmount}
                  className='text-center text-lg font-bold'
                  readOnly={!modifying}
                />
              </div>
              <div className='flex flex-col gap-4'>
                <Label
                  className='m-auto font-semibold text-title text-lg'
                  htmlFor='amount'
                >
                  actuel
                </Label>
                <Input
                  readOnly={!modifying}
                  type='number'
                  min={0}
                  max={1000000}
                  name='currentAmount'
                  placeholder={`${
                    userCurrentAmount > 0
                      ? userCurrentAmount
                      : currentAmountFromDatabase
                  }`}
                  defaultValue={
                    userCurrentAmount > 0
                      ? userCurrentAmount
                      : currentAmountFromDatabase
                  }
                  className='text-center text-lg font-bold'
                />
              </div>
            </div>
            <div className='flex items-end flex-row-reverse gap-2'>
              <div
                className='flex items-center justify-center w-8 h-8 rounded-full'
                onClick={() => setModifying(!modifying)}
              >
                <Wrench size={20} className='text-title' />
              </div>
              <Button
                type='submit'
                className='hover:text-primary-foreground font-bold'
              >
                Mon ROI
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
