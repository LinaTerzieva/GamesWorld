

const CatalogFilters = () => {
    return (
        <div className="catalog-content__filters">
            <div className="filter-box">
                <div className="filter-box__content">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            className="checkbox-input"
                        />
                        <span className="checkmark" />
                        Show only discounted
                    </label>
                </div>
            </div>
        </div>
    );
}

export default CatalogFilters;