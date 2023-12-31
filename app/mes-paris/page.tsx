import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Bet } from "@/components/Bet"

const Bets = async () => {
  const session = await getAuthSession()
  const myBets = await prisma.bets.findMany({
    where: {
      userId: session?.user.id,
    },
  })

  return (
    <Card className='flex flex-col items-center my-6 p-2'>
      <CardHeader className='font-bold text-lg'>
        <h1 className='text-2xl'>Mes paris</h1>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        {myBets.length === 0 && (
          <p className='italic'>{`Vous n'avez pas encore de paris`}</p>
        )}
        {myBets.map((bet) => (
          <Bet bet={bet} key={bet.id} />
        ))}
      </CardContent>
    </Card>
  )
}

export default Bets
