"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { AddBankrollForm } from "@/components/form/addBankrollForm"
import { useState } from "react"

export const FirstLogin = () => {
  const [viewAddBankroll, setViewAddBankroll] = useState(false)

  return (
    <div className='flex  justify-center items-center h-full'>
      <Card className='flex flex-col items-center justify-center w-full p-2 border-none bg-background'>
        <CardHeader className='font-bold  text-lg'>
          <CardTitle className='sm:text-2xl leading-loose'>
            Pour commencer à rentrer vos paris, veuillez ajouter une bankroll
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col items-center'>
          {viewAddBankroll ? (
            <AddBankrollForm />
          ) : (
            <PlusCircle
              onClick={() => setViewAddBankroll(true)}
              className={"h-10 w-10 text-texthover"}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
