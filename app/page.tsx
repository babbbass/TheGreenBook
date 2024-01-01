import { BettingForm } from "@/components/form/bettingForm"
import { ReturnOnInvestmentForm } from "@/components/form/returnOnInvestmentForm"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CapitalGainChartLine } from "@/components/chart/capitalGainChartLine"

export default async function Home() {
  const session = await getAuthSession()

  if (!session) {
    return (
      <ReturnOnInvestmentForm startAmount={0} currentAmountFromDatabase={0} />
    )
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: {
      profile: {
        select: {
          startAmount: true,
          currentAmount: true,
        },
      },
    },
  })

  const userBets = await prisma.bets.findMany({
    where: {
      userId: session?.user.id,
    },
    select: {
      amount: true,
      odd: true,
      status: true,
    },
  })

  const startAmount = Number(user?.profile?.startAmount)
  const currentAmount = Number(user?.profile?.currentAmount)

  return (
    <>
      <BettingForm currentAmountFromDatabase={currentAmount} />
      <ReturnOnInvestmentForm
        startAmount={startAmount}
        currentAmountFromDatabase={currentAmount}
      />
      <CapitalGainChartLine startAmount={startAmount} userBets={userBets} />
    </>
  )
}
