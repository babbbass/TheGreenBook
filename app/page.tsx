import { BettingForm } from "@/components/form/bettingForm"
import { ReturnOnInvestmentForm } from "@/components/form/returnOnInvestmentForm"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const session = await getAuthSession()

  if (!session) {
    return <ReturnOnInvestmentForm startAmount={0} currentAmount={0} />
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

  const startAmount = Number(user?.profile?.startAmount)
  const currentAmount = Number(user?.profile?.currentAmount)

  return (
    <>
      <BettingForm />
      <ReturnOnInvestmentForm
        startAmount={startAmount}
        currentAmount={currentAmount}
      />
    </>
  )
}
