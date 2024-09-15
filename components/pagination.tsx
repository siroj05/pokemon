import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem
} from "@/components/ui/pagination-base";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

interface Props {
  count : number
  pageSize : number
}

export default function PaginationPokemon(
  {
    count,
    pageSize
  }:Props
) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1;
  const sum = Math.ceil(count / pageSize);

  const createPageURL = (pageNumber : string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`
  }

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (sum <= 5) {
      for (let i = 1; i <= sum; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', sum);
      } else if (currentPage >= sum - 2) {
        pageNumbers.push(1, '...', sum - 3, sum - 2, sum - 1, sum);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', sum);
      }
    }
    return pageNumbers;
  };

  const pageNumbers : (string | number)[] = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent className="flex gap-3">
        <PaginationItem>
          {
            currentPage-1 !== 0 &&
            <Link href={createPageURL(currentPage-1)}>{'Prev'}</Link>
          }
        </PaginationItem>
        {
          pageNumbers.map((number, index) => (
            <PaginationItem key={index}>
              { number == '...'? (
                <PaginationEllipsis />
              ): 
                <Link href={createPageURL(number)}>{number}</Link>
              }
            </PaginationItem>
          ))
        }
        <PaginationItem>
          {
            pageNumbers.length > 5 &&
            <Link href={createPageURL(currentPage+1)}>
            {'Next'}
          </Link>}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
