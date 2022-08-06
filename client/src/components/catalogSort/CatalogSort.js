
import styles from './CatalogSort.module.css';

const CatalogSort = ({handleQuery, sortBy}) => {

    const handleSelectChange = (e) =>  {
        
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
                    <select className={styles.sortBoxDropdownContent} name="sort" value={sortBy} onChange={handleSelectChange}>
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