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

export const UserProfile = async () => {
  const session = await getAuthSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='sm' variant='outline'>
          {session?.user.name ?? ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          asChild
          className='cursor-pointer hover:text-texthover hover:font-bold'
        >
          <Link href='/profile'>
            <User2 className='mr-2 h-4 w-4s' /> Profile
          </Link>
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
