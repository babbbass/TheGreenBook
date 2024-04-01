"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from "@/components/ui/loader"
import { enterBetInDatabase, fetchUserBets } from "@/lib/actions/updateProfile"
import { returnOnInvestmentFunc } from "@/lib/calculation"
import { useCapitalGainChartStore } from "@/src/store/capitalGainChartStore"
import { useRoiAndPercentStore } from "@/src/store/roiAndPercentStore"
import { useRef, useTransition } from "react"

const checkIfValidateNumber = (value: number) => {
  if (value <= 0) return false
  return true
}

type BettingFormData = {
  currentAmountFromDatabase: number
  startAmount: number
}
export const BettingForm = ({
  currentAmountFromDatabase,
  startAmount,
}: BettingFormData) => {
  const { setUserBetsStore } = useCapitalGainChartStore()
  const ref = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()
  const { setRoi, setCurrentAmount, currentAmount } = useRoiAndPercentStore()

  const amount = currentAmount === 0 ? currentAmountFromDatabase : currentAmount
  async function handleSubmit(formData: FormData) {
    if (!checkIfValidateNumber(Number(formData.get("amount")))) return
    if (!checkIfValidateNumber(Number(formData.get("odd")))) return
    if (Number(formData.get("amount")) > amount) return

    const updatedCurrentAmount =
      currentAmount > 0
        ? currentAmount - Number(formData.get("amount"))
        : currentAmountFromDatabase - Number(formData.get("amount"))

    setCurrentAmount(updatedCurrentAmount)
    setRoi(returnOnInvestmentFunc(startAmount, updatedCurrentAmount))

    await enterBetInDatabase(
      Number(formData.get("amount")),
      Number(formData.get("odd"))
    )

    const userBets = await fetchUserBets()
    setUserBetsStore([
      ...userBets,
      {
        id: userBets.pop()?.id,
        amount: Number(formData.get("amount")),
        odd: Number(formData.get("odd")),
        status: "Pending",
      },
    ])
    ref.current?.reset()
  }

  return (
    <Card className={"py-4 flex flex-col items-center gap-4"}>
      <CardHeader className='w-full flex items-center font-bold text-2xl'>
        <CardTitle>Nouveau pari</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          ref={ref}
          action={(ref) => startTransition(() => handleSubmit(ref))}
          className='space-y-8'
        >
          <div className='flex flex-col gap-4'>
            <Label className='m-auto font-semibold  text-lg' htmlFor='amount'>
              Montant
            </Label>
            <Input
              placeholder='0'
              name='amount'
              className='text-center text-lg from-neutral-500'
              readOnly={amount <= 0 ? true : false}
            />
          </div>
          <div className='flex flex-col gap-4'>
            <Label className='m-auto font-semibold  text-lg' htmlFor='odd'>
              Côte
            </Label>
            <Input
              placeholder='0'
              name='odd'
              className='text-center text-lg from-neutral-500'
              readOnly={amount <= 0 ? true : false}
            />
          </div>
          <div className='w-full flex flex-row-reverse'>
            <Button
              type='submit'
              className='text-base hover:text-primary-foreground'
            >
              {isPending ? <Loader className='mr-2 h-4 w-4' /> : ""} Parier
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
