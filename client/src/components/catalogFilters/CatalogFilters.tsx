import { Query } from '../../lib/types';
import styles from './CatalogFilters.module.css';

type CatalogFiltersProps = {
    discount: boolean,
    pageSize: number,
    handleDiscount: React.Dispatch<React.SetStateAction<Query>>
}

const CatalogFilters = ({discount, pageSize , handleDiscount}: CatalogFiltersProps) => {

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
                                    pageSize: pageSize,
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