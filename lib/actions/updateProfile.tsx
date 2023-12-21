"use server"

import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"

export const updateProfileUser = async (
  startAmount: number,
  currentAmount: number
) => {
  const session = await getAuthSession()
  console.log(startAmount, currentAmount, "action server")
  const updateUser = await prisma.profile.upsert({
    where: {
      userId: session?.user.id,
    },
    update: {
      startAmount: startAmount,
      currentAmount: currentAmount,
    },
    create: {
      userId: String(session?.user.id),
      startAmount: startAmount,
      currentAmount: currentAmount,
    },
  })

  return session
}

export const calculateProfileAfterBetting = () => {}
