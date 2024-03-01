import Pagination from "react-bootstrap/esm/Pagination";

type Props = {
    page: any;
    totalPages: any;
    setPage: () => void;
};

const PaginationComponent = (page: any, totalPages: any, setPage: any) => {
    const displayedPages = [];
    const itemsPerPage = 5; // Number of displayed page numbers
    // Calculate starting and ending page for the displayed range
    const startIndex = Math.max(Math.ceil(page - itemsPerPage / 2), 1);
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalPages);
    // Fill the displayedPages array with page numbers
    for (let i = startIndex; i <= endIndex; i++) {
        displayedPages.push(i);
    }

    return (
        <>
            <Pagination>
                <Pagination.First onClick={() => setPage(0)} />
                <Pagination.Prev
                    onClick={() => {
                        page >= 1 && setPage(page - 1);
                    }}
                />
                {page > itemsPerPage / 2 && <Pagination.Ellipsis />}
                {displayedPages.map((pageNumber) => (
                    <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === page}
                        onClick={() => setPage(pageNumber)}
                    >
                        {pageNumber}
                    </Pagination.Item>
                ))}
                {page < totalPages - itemsPerPage / 2 && (
                    <Pagination.Ellipsis />
                )}
                <Pagination.Next onClick={() => setPage(page + 1)} />
                <Pagination.Last onClick={() => setPage(totalPages - 1)} />
                {/* <input
                                                type="number"
                                                min="1"
                                                max={totalPages}
                                                value={page}
                                                onChange={(e) => {
                                                    e.target.value !==
                                                        undefined &&
                                                    +e.target.value > 0
                                                        ? setPage(
                                                              parseInt(
                                                                  e.target.value
                                                              )
                                                          )
                                                        : "";
                                                }}
                                            /> */}
            </Pagination>
        </>
    );
};

export default PaginationComponent;
