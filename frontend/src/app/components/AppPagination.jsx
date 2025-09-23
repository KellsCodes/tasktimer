"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function AppPagination({ currentPage, totalPages }) {

    const handleGoToPage = (page) => {
        if (page < 1 || page > totalPages) return
        let newPath = ""
        const pathName = window.location.href
        // check if there is no pagination yet, add page number to link
        if (!(/page=/.test(pathName))) {
            const puid = window.crypto.randomUUID()
            newPath = `${pathName}?pguuid=${puid}&page=${page}`
        } else {
            newPath = pathName.split("&").map(value => {
                if (!(/page=/.test(value))) return value
                const pageNumber = `page=${page}`
                return pageNumber
            }).join("&")

        }
        window.location.href = newPath
    }
    return (
        <Pagination>
            <PaginationContent>
                {/* Previous button */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handleGoToPage(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                    />
                </PaginationItem>

                {/* Page number links */}
                {Array.from({ length: totalPages }, (_, i) => {
                    const page = i + 1;
                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => handleGoToPage(page)}
                                isActive={page === currentPage}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Next button */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => handleGoToPage(currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}