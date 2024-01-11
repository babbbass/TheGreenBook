import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const Profile = async () => {
  const session = await getAuthSession()

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: {
      name: true,
      image: true,
      profile: {
        select: {
          startAmount: true,
          currentAmount: true,
        },
      },
    },
  })

  const userBets = await prisma.bets.groupBy({
    by: ["status"],
    where: {
      userId: session?.user.id,
    },
    _count: {
      status: true,
    },
  })

  return (
    <div className='flex flex-col items-center gap-20 justify-center min-h-full'>
      <Badge
        variant='secondary'
        className='font-bold h-20 flex justify-center text-3xl '
      >
        Mon Profil
      </Badge>
      <Card className='flex flex-col items-center justify-center gap-3 p-2 md:text-lg'>
        <CardHeader className='flex flex-col justify-center'>
          <Avatar className='h-24 w-24 mb-2'>
            <AvatarImage
              src={`${user?.image}`}
              alt={`${session?.user.name}_avatar`}
            />
            <AvatarFallback>
              {session?.user.name ? session?.user.name[0].toUpperCase() : "G"}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <p>
            <span className='inline-block w-36 mr-2 font-semibold'>
              Montant depart :
            </span>{" "}
            {user?.profile?.startAmount}€
          </p>
          <p>
            <span className='inline-block w-36 mr-2 font-semibold'>
              Montant actuel:
            </span>{" "}
            {user?.profile?.currentAmount}€
          </p>
          <p>
            <span className='inline-block w-36 mr-2 font-semibold'>
              Nombre de paris:
            </span>{" "}
            {userBets?.reduce((acc, bet) => acc + bet._count?.status, 0)}
          </p>
          <p>
            <span className='inline-block w-36 mr-2 font-semibold'>
              Gagnants:
            </span>{" "}
            {userBets?.filter((bet) => bet.status === "Won")[0]?._count?.status}
          </p>
          <p>
            <span className='inline-block w-36 mr-2 font-semibold'>
              Perdants:
            </span>{" "}
            {
              userBets?.filter((bet) => bet.status === "Lost")[0]?._count
                ?.status
            }
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile
