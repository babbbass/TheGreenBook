import React from "react"
import { LoginButton } from "./LoginButton"
import { getAuthSession } from "@/lib/auth"
import { UserProfile } from "./UserProfile"
import Link from "next/link"

export const Header = async () => {
  const session = await getAuthSession()
  return (
    <header className='border-b border-b-accent'>
      <div className='container flex items-center max-w-3xl mx-auto py-2 gap-1'>
        <h2 className='text-2xl font-bold mr-auto sm:text-3xl'>
          <Link href='/'>Green Book</Link>
        </h2>
        {session?.user ? <UserProfile /> : <LoginButton />}
      </div>
    </header>
  )
}
