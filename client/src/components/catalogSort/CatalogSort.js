

const CatalogSort = () => {
    return (
        <div className="results__navigation">
            <div className="sort-box">
                <div className="sort-box__label">Sort by:</div>
                <div className="sort-box__dropdown">
                    <select className="sort-box__dropdown-content" name="sort">
                        <option className="sort-box__option" value="price asc">
                            Price: Low to High
                        </option>
                        <option className="sort-box__option" value="price desc">
                            Price: High to Low
                        </option>
                        <option className="sort-box__option" value="title asc">
                            Title: Low to High
                        </option>
                        <option className="sort-box__option" value="title desc">
                            Title: High to Low
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default CatalogSort;