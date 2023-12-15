import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAuthSession } from "@/lib/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const formSchema = z.object({
  start_amount: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default async function Home() {
  const session = await getAuthSession()
  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       start_amount: "",
  //     },
  //   })

  return (
    <form className='flex flex-col gap-2'>
      <Input type='text' name='start_amount' placeholder='Montant départ' />
      <Input type='text' name='current_amount' placeholder='Montant actuel' />
      <Button type='submit'>Calcul</Button>
    </form>
  )
}
