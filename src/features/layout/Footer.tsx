import Link from "next/link"
import React from "react"
import { Ghost, Home, User } from "lucide-react"
import clsx from "clsx"
import { buttonVariants } from "@/components/ui/button"

export const Footer = () => {
  return (
    <div className='py-2 flex justify-between bg-background max-w-lg container'>
      <Link
        href='/'
        className={clsx(
          buttonVariants({
            variant: "ghost",
          }),
          "flex-1"
        )}
      >
        <Home size={16} />
      </Link>
      <Link
        href='/profile'
        className={clsx(
          buttonVariants({
            variant: "ghost",
          }),
          "flex-1"
        )}
      >
        <User size={16} />
      </Link>
    </div>
  )
}
