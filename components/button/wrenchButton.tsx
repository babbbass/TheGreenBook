import { Ban, Pencil } from "lucide-react"

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
      {modifying ? (
        <Pencil size={20} className='text-red-700' />
      ) : (
        <Ban size={20} />
      )}
    </div>
  )
}
