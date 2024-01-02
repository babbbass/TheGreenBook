"use client"
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import clsx from "clsx"
import { useRouter, useSearchParams } from "next/navigation"

type PaginationControls = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  nbPages: number
}

export const PaginationControls = ({
  hasNextPage,
  hasPreviousPage,
  nbPages,
}: PaginationControls) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentPage = searchParams?.get("page") ?? 1
  const per_page = searchParams?.get("per_page") ?? 5
  const paginationLink = []

  for (let page = 1; page <= nbPages; page++) {
    paginationLink.push(
      <PaginationLink
        key={page}
        className={clsx("cursor-pointer", {
          "bg-texthover": page === Number(currentPage),
        })}
        onClick={() =>
          router.push(`/mes-paris?page=${page}&per_page=${per_page}`)
        }
      >
        {page}
      </PaginationLink>
    )
  }

  return (
    <Pagination className='m-6'>
      <PaginationContent>
        <PaginationPrevious
          className={clsx({ hidden: !hasPreviousPage }, "cursor-pointer")}
          onClick={() =>
            router.push(`?page=${Number(currentPage) - 1}&per_page=${per_page}`)
          }
        />
        {paginationLink}
        <PaginationNext
          className={clsx({ hidden: !hasNextPage }, "cursor-pointer")}
          onClick={() =>
            router.push(`?page=${Number(currentPage) + 1}&per_page=${per_page}`)
          }
        />
      </PaginationContent>
    </Pagination>
  )
}
