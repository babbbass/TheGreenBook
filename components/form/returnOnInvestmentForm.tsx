"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { updateProfileUser } from "@/lib/actions/updateProfile"
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card"
import { useDashBoardContext } from "@/context/dashboardContext"
import { useState, useTransition, useRef } from "react"
import { WrenchButton } from "../button/wrenchButton"
import { Loader } from "lucide-react"

export type Amounts = {
  startAmount: number
  currentAmountFromDatabase: number
}
export const ReturnOnInvestmentForm = ({
  startAmount,
  currentAmountFromDatabase,
}: Amounts) => {
  const [modifying, setModifying] = useState(false)
  const { userCurrentAmount, setUserCurrentAmount } = useDashBoardContext()
  const ref = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    if (!modifying) return
    const startAmount = Number(formData.get("startAmount"))
    const currentAmount = Number(formData.get("currentAmount"))
    setUserCurrentAmount(currentAmount)
    await updateProfileUser(startAmount, currentAmount)
  }

  return (
    <>
      <Card className='py-4 w-full flex flex-col items-center gap-4 sm:mb-4 sm:flex-row md:w-3/4'>
        <CardHeader className='font-bold text-2xl'>
          <CardTitle>Montants</CardTitle>
        </CardHeader>
        <CardContent className='w-full'>
          <form
            ref={ref}
            action={(ref) => startTransition(() => handleSubmit(ref))}
            className='flex flex-col justify-center gap-8 sm:flex-row'
          >
            <div className='flex flex-col items-stretch w-5/6 gap-8 sm:flex-row'>
              <div className='flex flex-col gap-4'>
                <Label
                  className='m-auto font-semibold text-lg'
                  htmlFor='amount'
                >
                  demarrage
                </Label>
                <Input
                  type='numeric'
                  name='startAmount'
                  min={0}
                  max={1000000}
                  defaultValue={startAmount}
                  className='text-center text-lg'
                  readOnly={!modifying}
                />
              </div>
              <div className='flex flex-col gap-4'>
                <Label
                  className='m-auto font-semibold text-lg'
                  htmlFor='amount'
                >
                  actuel
                </Label>
                <Input
                  readOnly={!modifying}
                  type='numeric'
                  min={0}
                  max={1000000}
                  name='currentAmount'
                  defaultValue={
                    userCurrentAmount > 0
                      ? userCurrentAmount
                      : currentAmountFromDatabase
                  }
                  className='text-center text-lg'
                />
              </div>
            </div>
            <div className='flex items-end flex-row-reverse gap-2'>
              <WrenchButton modifying={modifying} setModifying={setModifying} />
              <Button
                type='submit'
                className='hover:text-primary-foreground font-bold'
              >
                {isPending ? <Loader className='mr-2 h-4 w-4' /> : ""} Mon ROI
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
