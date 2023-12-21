import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DashBoard = {
  returnOnInvestment: number
  percentageOnInvestment: number
}
export const DashBoard = async ({
  returnOnInvestment,
  percentageOnInvestment,
}: DashBoard) => {
  //console.log(updateProfileUser)

  return (
    <>
      <Card className='flex flex-col items-center my-6'>
        <CardHeader>
          <CardTitle>Mon Tableau de bord</CardTitle>
        </CardHeader>
        <CardContent className='flex gap-2 w-full justify-around'>
          <div className='flex flex-col items-center'>
            <h3>Mon ROI</h3>
            <p>{returnOnInvestment}</p>
          </div>
          <div className='flex flex-col items-center'>
            <h3>% de gain</h3>
            <p>{percentageOnInvestment}</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
