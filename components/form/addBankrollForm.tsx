"use client"

import { useTransition, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { updateProfileUser } from "@/lib/actions/updateProfile"
import { Loader } from "lucide-react"
import { redirect } from "next/navigation"

export const AddBankrollForm = () => {
  const [isPending, startTransition] = useTransition()
  const ref = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    const startAmount = Number(formData.get("startAmount"))
    const currentAmount = startAmount
    if (!startAmount || startAmount < 0) return

    await updateProfileUser(startAmount, currentAmount)
    redirect("/")
  }
  return (
    <div>
      <Card className='py-4 w-full flex flex-col items-center gap-4'>
        <CardContent className='w-full'>
          <form
            ref={ref}
            action={(ref) => startTransition(() => handleSubmit(ref))}
            className='flex flex-col items-center justify-center gap-8'
          >
            <div className='flex flex-col items-stretch w-5/6 gap-8'>
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
                  defaultValue={0}
                  className='text-center text-lg'
                />
              </div>
            </div>
            <div className='flex items-end flex-row-reverse gap-2'>
              <Button
                type='submit'
                className='hover:text-primary-foreground font-bold'
              >
                {isPending ? <Loader className='mr-2 h-4 w-4' /> : ""} Ajouter
                Bankroll
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
