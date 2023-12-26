"use server"

import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"

const PENDING = "pending"
type BettingForm = {
  amount: number
  odd: number
}

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

export const enterBetInDatabase = async (amount: number, odd: number) => {
  const session = await getAuthSession()

  if (!session?.user.id) return

  const userCurrentAmount = await prisma.profile.findUnique({
    where: {
      userId: session?.user.id,
    },
    select: {
      currentAmount: true,
    },
  })
  if (!userCurrentAmount?.currentAmount) return
  const { currentAmount } = userCurrentAmount

  const userBet = await prisma.bets.create({
    data: {
      amount: amount,
      odd: odd,
      status: PENDING,
      userId: session?.user.id,
    },
  })

  console.log("action server bet placé")

  await prisma.profile.update({
    where: {
      userId: session?.user.id,
    },
    data: {
      currentAmount: currentAmount - amount,
    },
  })
  console.log("action server profile updated")
}