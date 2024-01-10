import { Wrench } from "lucide-react"

export const WrenchButton = ({
  modifying,
  setModifying,
}: {
  modifying: boolean
  setModifying: (v: boolean) => void
}) => {
  return (
    <div
      className='flex items-center justify-center w-8 h-8 rounded-full cursor-pointer'
      onClick={() => setModifying(!modifying)}
    >
      <Wrench size={20} />
    </div>
  )
}
