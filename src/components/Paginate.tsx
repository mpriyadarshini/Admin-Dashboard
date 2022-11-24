import React from 'react'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

type PaginateProps = {
    numberOfPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

function range(start: number, end: number) {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
}


const Pagination = ({ numberOfPages, currentPage, setCurrentPage }: PaginateProps) => {

    const pageNumbers = range(1, numberOfPages);

    const nextPage = () => {
        if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    return (
        <nav>
            <ul className='flex pagination justify-content-center'>
                <li className="page-item">
                    <a className="page-link"
                        onClick={prevPage}
                        href='#'>

                        <IoIosArrowDropleftCircle size="40" color='blue' />
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className='p-2'>

                        <a onClick={() => setCurrentPage(pgNumber)}
                            className='rounded-full bg-blue-500 p-3 text-white'
                            href='#'>

                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link"
                        onClick={nextPage}
                        href='#'>

                        <IoIosArrowDroprightCircle size="40" color='blue' />
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
