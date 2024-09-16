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
      <PaginationContent className="flex gap-2 items-center justify-center">
        <PaginationItem>
          {currentPage - 1 !== 0 && (
            <Link
              href={createPageURL(currentPage - 1)}
              className="px-4 py-2 max-sm:px-2 max-sm:py-1 text-sm max-sm:text-xs font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Prev
            </Link>
          )}
        </PaginationItem>
        {pageNumbers.map((number, index) => (
          <PaginationItem key={index}>
            {number === "..." ? (
              <PaginationEllipsis className="px-2 py-1 max-sm:px-1 max-sm:py-0.5" />
            ) : (
              <Link
                href={createPageURL(number)}
                className={`px-4 py-2 max-sm:px-2 max-sm:py-1 text-sm max-sm:text-xs font-semibold rounded-md transition ${
                  number === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {number}
              </Link>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          {currentPage < sum && (
            <Link
              href={createPageURL(currentPage + 1)}
              className="px-4 py-2 max-sm:px-2 max-sm:py-1 text-sm max-sm:text-xs font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Next
            </Link>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
