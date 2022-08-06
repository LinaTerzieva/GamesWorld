
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import styles from './CatalogPagination.module.css';

const CatalogPagination = ({
    numberOfResults,
    pageSize,
    handleQuery,
    offset
}) => {

    const numberOfPages = Math.ceil(numberOfResults / pageSize);
    const currentPage = offset / pageSize + 1;

    var pages = [];
    for (var i = 1; i <= numberOfPages; i++) {
        const offsetValue = (i - 1) * pageSize;
        pages.push(
            <button key={i} className={`${styles.paginationButton} ${currentPage == i ? `${styles.bold}` : ''}`} onClick={() => {
                handleQuery((state) => {
                    return {
                        ...state,
                        offset: offsetValue
                    }
                })
            }}>
                {i}
            </button>
        );
    }

    return (
        <div className={styles.pagination}>
            {offset > 0 &&
                <button className={styles.paginationButton}>
                    <FontAwesomeIcon icon={faChevronLeft} onClick={() => {
                        const offsetPrev = offset - pageSize;
                        handleQuery((state) => {
                            return {
                                ...state,
                                offset: offsetPrev
                            }
                        })
                    }} />
                </button>
            }
            {pages}
            {currentPage < numberOfPages &&
                <button className={styles.paginationButton}>
                    <FontAwesomeIcon icon={faChevronRight} onClick={() => {
                        const offsetNext = offset + pageSize;
                        handleQuery((state) => {
                            return {
                                ...state,
                                offset: offsetNext
                            }
                        })
                    }} />
                </button>
            }

        </div>
    );
}

export default CatalogPagination;