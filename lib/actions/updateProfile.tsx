"use server"

import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { STATUS_PENDING, STATUS_WIN } from "@/src/constant"

export const updateProfileUser = async (
  startAmount: number,
  currentAmount: number
) => {
  const session = await getAuthSession()
  await prisma.profile.upsert({
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
      status: STATUS_PENDING,
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

export const updateBetStatusInDatabase = async (
  bet: { id: string; userId: string },
  status: string
) => {
  const updateBet = await prisma.bets.update({
    where: {
      id: bet.id,
    },
    data: {
      status: status,
    },
  })

  const updateProfile = await prisma.profile.update({
    where: {
      userId: bet.userId,
    },
    data: {
      currentAmount: {
        increment:
          updateBet.status === STATUS_WIN
            ? updateBet.amount * updateBet.odd
            : 0,
      },
    },
  })
}

export const fetchUserBets = async () => {
  const session = await getAuthSession()

  const userBets = await prisma.bets.findMany({
    where: {
      userId: session?.user.id,
    },
    select: {
      id: true,
      amount: true,
      odd: true,
      status: true,
    },
  })
  return userBets
}
