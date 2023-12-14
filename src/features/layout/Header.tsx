import { Button } from "@/components/ui/button"
import React from "react"

export const Header = () => {
  return (
    <header className='border-b border-b-accent'>
      <div className='container flex items-center max-w-lg mx-auto py-2 gap-1'>
        <h2 className='text2xl font-bold mr-auto'>Green Book</h2>
        <Button>Connexion</Button>
      </div>
    </header>
  )
}
