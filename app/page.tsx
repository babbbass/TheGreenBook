import { CapitalGainChartLine } from "@/components/chart/capitalGainChartLine"
import { BettingForm } from "@/components/form/bettingForm"
import { ReturnOnInvestmentForm } from "@/components/form/returnOnInvestmentForm"
import { DashBoard } from "@/components/ui/dashBoard"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { LoginButton } from "@/src/features/layout/LoginButton"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getAuthSession()

  if (!session) {
    return (
      <div className='flex justify-center items-center h-full'>
        <LoginButton />
      </div>
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

  const currentAmount = user?.profile?.currentAmount

  if (!startAmount) {
    redirect("/addBankroll")
  }

  return (
    <div className='flex flex-col gap-4'>
      <ReturnOnInvestmentForm
        startAmount={startAmount}
        currentAmountFromDatabase={currentAmount ? currentAmount : 0}
      />
      <div className='flex flex-col justify-evenly sm:flex-row border-none p-2 gap-4 mb-4'>
        <BettingForm
          currentAmountFromDatabase={currentAmount ? currentAmount : 0}
          startAmount={startAmount}
        />
        <DashBoard startAmount={startAmount} />
      </div>

      <CapitalGainChartLine startAmount={startAmount} userBets={userBets} />
    </div>
  )
}
