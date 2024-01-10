import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Bet } from "@/components/Bet"
import { PaginationControls } from "@/components/pagination/paginationControls"

type SearchParams = {
  searchParams: {
    page: string
  }
}
const Bets = async ({ searchParams }: SearchParams) => {
  const session = await getAuthSession()
  const myBets = await prisma.bets.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const page = searchParams["page"] ?? 1
  const perPage = 5

  const start = (Number(page) - 1) * perPage
  const end = start + perPage

  const myBetsPaginated = myBets.slice(start, end)

  return (
    <Card className='relative flex flex-col items-center justify-items-center my-6 mx-auto max-w-xl p-2 h-[550px]'>
      <CardHeader className='font-bold text-lg'>
        <CardTitle className='text-2xl'>Mes paris</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        {myBets.length === 0 && (
          <p className='italic'>{`Vous n'avez pas encore de paris`}</p>
        )}
        {myBetsPaginated.map((bet) => (
          <Bet bet={bet} key={bet.id} />
        ))}
        <PaginationControls
          hasNextPage={myBets.length > end}
          hasPreviousPage={Number(page) > 1}
          nbPages={Math.ceil(myBets.length / perPage)}
        />
      </CardContent>
    </Card>
  )
}

export default Bets
