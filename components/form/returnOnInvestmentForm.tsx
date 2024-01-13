"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfileUser } from "@/lib/actions/updateProfile"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useTransition, useRef } from "react"
import { WrenchButton } from "@/components/button/wrenchButton"
import { Loader } from "lucide-react"
import { useRoiAndPercentStore } from "@/src/store/roiAndPercentStore"
import {
  percentageOnInvestmentFunc,
  returnOnInvestmentFunc,
} from "@/lib/calculation"

export type Amounts = {
  startAmount: number
  currentAmountFromDatabase: number
}
export const ReturnOnInvestmentForm = ({
  startAmount,
  currentAmountFromDatabase,
}: Amounts) => {
  const [modifying, setModifying] = useState(false)
  const ref = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()
  const { currentAmount, setPercentage, setRoi } = useRoiAndPercentStore()

  async function handleSubmit(formData: FormData) {
    if (!modifying) return
    const startAmount = Number(formData.get("startAmount"))
    const currentAmount = Number(formData.get("currentAmount"))

    setPercentage(percentageOnInvestmentFunc(startAmount, currentAmount))
    setRoi(returnOnInvestmentFunc(startAmount, currentAmount))
    await updateProfileUser(startAmount, currentAmount)
  }

  return (
    <div>
      <Card className='py-4 mx-2 flex flex-col m-auto items-center gap-4 sm:mb-4 sm:flex-row sm:w-3/4'>
        <CardContent className='w-full py-2'>
          <form
            ref={ref}
            action={(ref) => startTransition(() => handleSubmit(ref))}
            className='flex flex-col items-center justify-center gap-8 sm:flex-row'
          >
            <div className='flex flex-col items-stretch w-5/6 gap-8 sm:flex-row'>
              <div className='flex flex-col gap-4'>
                <Label
                  className='m-auto font-semibold text-lg'
                  htmlFor='amount'
                >
                  Capital de depart
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
                  value={
                    currentAmount > 0
                      ? currentAmount
                      : currentAmountFromDatabase
                  }
                  className='text-center text-lg'
                />
              </div>
            </div>
            <div className='flex gap-2'>
              <Button
                type='submit'
                className='hover:text-primary-foreground font-bold'
              >
                {isPending ? <Loader className='mr-2 h-4 w-4' /> : ""} Mon ROI
              </Button>
              <WrenchButton modifying={modifying} setModifying={setModifying} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
