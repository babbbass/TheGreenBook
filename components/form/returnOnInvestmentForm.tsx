"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
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
  const { userCurrentAmount, setUserCurrentAmount } = useDashBoardContext()
  async function handleSubmit(formData: FormData) {
    const startAmount = Number(formData.get("startAmount"))
    const currentAmount = Number(formData.get("currentAmount"))

    setUserCurrentAmount(currentAmount)
    await updateProfileUser(startAmount, currentAmount)
  }

  return (
    <>
      <Card className='py-4 flex flex-col items-center gap-4 sm:mb-4 sm:flex-row'>
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
                  className='m-auto font-semibold text-title'
                  htmlFor='amount'
                >
                  Montant demarrage
                </Label>
                <Input
                  name='startAmount'
                  placeholder={`${startAmount}`}
                  defaultValue={startAmount}
                  className='text-center'
                />
              </div>
              <div className='flex flex-col gap-4'>
                <Label
                  className='m-auto font-semibold text-title'
                  htmlFor='amount'
                >
                  Montant actuelle
                </Label>
                <Input
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
                  className='text-center'
                />
              </div>
            </div>
            <div className='flex items-end flex-row-reverse'>
              <Button type='submit' className='hover:text-primary-foreground'>
                Mon ROI
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
