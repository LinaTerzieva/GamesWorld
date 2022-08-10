import styles from './CatalogFilters.module.css';

const CatalogFilters = ({discount, pageSize , handleDiscount}) => {

    return (
        <div className={styles.catalogContentFilters}>
            <div className={styles.filterBox}>
                <div className={styles.filterBoxContent}>
                    <label className={styles.checkboxLabel}>
                        <input
                            checked={discount}
                            type="checkbox"
                            className={styles.checkboxInput}
                            onChange={(e) => handleDiscount(state => {
                                return {
                                    ...state,
                                    offset: 0,
                                    pageSize: {pageSize},
                                    discount: e.target.checked
                                }
                            })}
                        />
                        <span className={styles.checkmark} />
                        Show only discounted
                    </label>
                </div>
            </div>
        </div>
    );
}

export default CatalogFilters;