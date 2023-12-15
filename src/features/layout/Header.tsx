import React from "react"
import { LoginButton } from "./LoginButton"
import { getAuthSession } from "@/lib/auth"
import { UserProfile } from "./UserProfile"

export const Header = async () => {
  const session = await getAuthSession()
  return (
    <header className='border-b border-b-accent'>
      <div className='container flex items-center max-w-lg mx-auto py-2 gap-1'>
        <h2 className='text2xl font-bold mr-auto'>Green Book</h2>
        {session?.user ? <UserProfile /> : <LoginButton />}
      </div>
    </header>
  )
}
