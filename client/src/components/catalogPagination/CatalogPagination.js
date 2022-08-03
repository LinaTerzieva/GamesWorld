

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const CatalogPagination = ({
    numberOfResults,
    pageSize,
    handleOffset,
}) => {


    const numberOfPages = Math.ceil(numberOfResults / pageSize);

    var pages = [];
    for (var i = 1; i <= numberOfPages; i++) {
        const offsetValue = (i - 1) * pageSize;
        pages.push(
            <button key={i} className="small-pagination__button" onClick={() => { handleOffset(offsetValue) }}>
                {i}
            </button>
        );
    }


    return (
        <div className="pagination">
            <button className="small-pagination__button small-pagination__button--previous">
                <FontAwesomeIcon className="small-pagination__arrow" icon={faChevronLeft} />
            </button>
            {pages}
            <button className="small-pagination__button small-pagination__button--next">
                <FontAwesomeIcon className="small-pagination__arrow" icon={faChevronRight} />
            </button>
        </div>
    );
}

export default CatalogPagination;