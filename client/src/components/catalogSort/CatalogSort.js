import { useState, useEffect } from "react";

import styles from './CatalogSort.module.css';

const CatalogSort = ({handleQuery}) => {

    const [selectedSortOption,setselectedSortOption] = useState("price");

    const handleSelectChange = (e) =>  {
        setselectedSortOption(e.target.value);
    }

    useEffect(() => {
        handleQuery((state) => {
            return {
                ...state,
                sortBy: selectedSortOption,
                offset: 0
            }
        })
    }, [selectedSortOption]);

    return (
        <div className={styles.resultsNavigation}>
            <div className={styles.sortBox}>
                <div className={styles.sortBoxLabel}>Sort by:</div>
                <div className={styles.sortBoxDropdown}>
                    <select className={styles.sortBoxDropdownContent} name="sort" value={selectedSortOption} onChange={handleSelectChange}>
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