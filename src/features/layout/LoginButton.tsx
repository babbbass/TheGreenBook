"use client"

import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"
import { LogIn } from "lucide-react"
import { signIn } from "next-auth/react"
import React, { useTransition } from "react"

export const LoginButton = () => {
  const [isPending, startTransition] = useTransition()
  return (
    <Button
      className='cursor-pointer hover:text-slate-50 hover:font-bold'
      onClick={() => startTransition(() => signIn())}
    >
      {isPending ? (
        <Loader className='mr-2 h-4 w-4' />
      ) : (
        <LogIn className='mr-2 h-4 w-4' />
      )}{" "}
      Connexion
    </Button>
  )
}
