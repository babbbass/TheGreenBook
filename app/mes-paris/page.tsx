import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { WinningBetButton } from "@/components/button/winningBetButton"
import { LosingBetButton } from "@/components/button/losingBetButton"

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
const Bets = async () => {
  const session = await getAuthSession()
  const myBets = await prisma.bets.findMany({
    where: {
      userId: session?.user.id,
    },
  })

  console.log(myBets)
  return (
    <Card className='flex flex-col items-center my-6'>
      <CardHeader className='font-bold text-lg'>
        <h1 className='text-2xl'>Mes paris</h1>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        {myBets.length === 0 && (
          <p className='italic'>{`Vous n'avez pas encore de paris`}</p>
        )}
        {myBets.map((bet) => (
          <div
            key={bet.id}
            className='border-2 mb-2 p-2 flex gap-4 items-center'
          >
            <div className='flex flex-col items-center justify-center'>
              <span className='font-bold'>Mise</span>
              <span>{bet.amount}€</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='font-bold'>Côte</span>
              <span>{bet.odd}</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='font-bold'>Status</span>
              <span>{bet.status}</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='font-bold'>Date</span>
              <span>{formatDate(bet.createdAt)}</span>
            </div>
            <div className='flex gap-4 items-center'>
              <WinningBetButton />
              <LosingBetButton />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default Bets
