
import { Query } from '../../lib/types';
import styles from './CatalogSort.module.css';

type CatalogSortProps = {
    handleQuery: React.Dispatch<React.SetStateAction<Query>>,
    sortBy: string | null,
}

const CatalogSort = ({handleQuery, sortBy}: CatalogSortProps) => {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>  {
        
        handleQuery((state) => {
            return {
                ...state,
                sortBy: e.target.value,
                offset: 0
            }
        })
    }


    return (
        <div className={styles.resultsNavigation}>
            <div className={styles.sortBox}>
                <div className={styles.sortBoxLabel}>Sort by:</div>
                <div className={styles.sortBoxDropdown}>
                    <select className={styles.sortBoxDropdownContent} name="sort" value={sortBy == null ? '' : sortBy} onChange={handleSelectChange}>
                        <option className={styles.sortBoxOption} value="price">
                            Price: Low to High
                        </option>
                        <option className={styles.sortBoxOption} value="price desc">
                            Price: High to Low
                        </option>
                        <option className={styles.sortBoxOption} value="title">
                            Title: Low to High
                        </option>
                        <option className={styles.sortBoxOption} value="title desc">
                            Title: High to Low
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default CatalogSort;