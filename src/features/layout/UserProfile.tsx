import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAuthSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"
import { User2, Newspaper } from "lucide-react"
import { DropdownMenuItemLogout } from "./DropdownMenuItemLogout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const UserProfile = async () => {
  const session = await getAuthSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='gap-2' size='sm' variant='outline'>
          <Avatar className='h-6 w-6'>
            {session?.user.image && (
              <AvatarImage src={session.user.image} alt='avatar' />
            )}
            <AvatarFallback>
              {session?.user.name ? session?.user.name[0].toUpperCase() : "G"}
            </AvatarFallback>
          </Avatar>
          <span className='text-title font-bold text-sm'>
            {session?.user.name ?? ""}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          asChild
          className='cursor-pointer hover:text-texthover hover:font-bold'
        >
          {/* <Link href=''>
            <User2 className='mr-2 h-4 w-4s' /> Profile
          </Link> */}
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className='cursor-pointer hover:text-texthover hover:font-bold'
        >
          <Link href='/mes-paris'>
            <Newspaper className='mr-2 h-4 w-4s' /> Mes paris
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItemLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
