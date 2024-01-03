"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { DashBoard } from "../ui/dashBoard"
import { updateProfileUser } from "@/lib/actions/updateProfile"
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card"
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
      <Card className='py-4 flex flex-col items-center gap-4'>
        <CardHeader className='w-full flex items-center font-bold text-2xl'>
          <CardTitle className='text-title'>Montants</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className='space-y-8'>
            <div className='flex flex-col gap-4'>
              <Label className='ml-2 font-semibold text-title' htmlFor='amount'>
                Montant demarrage
              </Label>
              <Input
                name='startAmount'
                placeholder={`${startAmount}`}
                defaultValue={startAmount}
              />
            </div>
            <div className='flex flex-col gap-4'>
              <Label className='ml-2 font-semibold text-title' htmlFor='amount'>
                Montant actuelle
              </Label>
              <Input
                name='currentAmount'
                placeholder={`${currentAmountFromDatabase}`}
                defaultValue={
                  userCurrentAmount > 0
                    ? userCurrentAmount
                    : currentAmountFromDatabase
                }
              />
            </div>
            <div className='flex flex-row-reverse w-full'>
              <Button type='submit' className='hover:text-primary-foreground'>
                Mon ROI
              </Button>
            </div>
          </form>
        </CardContent>
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
