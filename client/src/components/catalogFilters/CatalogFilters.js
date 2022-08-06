import styles from './CatalogFilters.module.css';

const CatalogFilters = ({handleDiscount}) => {

    return (
        <div className={styles.catalogContentFilters}>
            <div className={styles.filterBox}>
                <div className={styles.filterBoxContent}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.checkboxInput}
                            onChange={(e) => handleDiscount(state => {
                                return {
                                    ...state,
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