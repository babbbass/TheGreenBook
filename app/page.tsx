import { BettingForm } from "@/components/form/bettingForm"
import { ReturnOnInvestmentForm } from "@/components/form/returnOnInvestmentForm"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CapitalGainChartLine } from "@/components/chart/capitalGainChartLine"
import { Card } from "@/components/ui/card"
import { DashBoard } from "@/components/ui/dashBoard"

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

  const startAmount = user?.profile?.startAmount
    ? Number(user.profile.startAmount)
    : 0
  const currentAmount = user?.profile?.currentAmount
    ? Number(user.profile.currentAmount)
    : 0

  return (
    <>
      <div className='flex justify-center w-full'>
        <ReturnOnInvestmentForm
          startAmount={startAmount}
          currentAmountFromDatabase={currentAmount}
        />
      </div>
      <Card className='flex flex-col justify-evenly md:flex-row bg-background border-none p-2 gap-4 mb-4'>
        <BettingForm currentAmountFromDatabase={currentAmount} />
        <DashBoard currentAmount={currentAmount} startAmount={startAmount} />
      </Card>
      <CapitalGainChartLine startAmount={startAmount} userBets={userBets} />
    </>
  )
}
