"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { enterBetInDatabase, fetchUserBets } from "@/lib/actions/updateProfile"
import { useDashBoardContext } from "@/context/dashboardContext"
import { useCapitalGainChartContext } from "@/context/capitalGainChartContext"
import { useRef, useTransition } from "react"
import { Loader } from "@/components/ui/loader"

type BettingFormData = {
  currentAmountFromDatabase: number
}
export const BettingForm = ({ currentAmountFromDatabase }: BettingFormData) => {
  const { setUserCurrentAmount } = useDashBoardContext()
  const { setUserBetsContext } = useCapitalGainChartContext()
  const ref = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()

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
        <CardTitle className='text-title'>Nouveau pari</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          ref={ref}
          action={(ref) => startTransition(() => handleSubmit(ref))}
          className='space-y-8'
        >
          <div className='flex flex-col gap-4'>
            <Label className='m-auto font-semibold text-title' htmlFor='amount'>
              Montant
            </Label>
            <Input placeholder='0' name='amount' className='text-center' />
          </div>
          <div className='flex flex-col gap-4'>
            <Label className='m-auto font-semibold text-title' htmlFor='odd'>
              Côte
            </Label>
            <Input placeholder='0' name='odd' className='text-center' />
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
