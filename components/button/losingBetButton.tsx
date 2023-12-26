import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
export const LosingBetButton = () => {
  return (
    <Button className='bg-white'>
      <XCircle className='text-red-500' />
    </Button>
  )
}
