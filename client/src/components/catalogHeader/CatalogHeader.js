
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from './CatalogHeader.module.css';

const CatalogHeader = ({ query, handleQuery }) => {

    const handleChange = (e) => {
        handleQuery((state) => {
            return {
                ...state,
                query: e.target.value,
                offset: 0
            }
        })
    }

    return (
        <div className={styles.catalogHeader}>
            <div className={styles.catalogTitle}>
                All Games
            </div>
            <div className={styles.catalogSearch}>
                <form className={styles.search}>
                    <FontAwesomeIcon className={styles.catalogSearchImage} icon={faMagnifyingGlass} />
                    <input
                        className={styles.catalogSearchInput}
                        type="search"
                        name="search"
                        placeholder="Search shop"
                        value={query}
                        onChange={handleChange}
                    />

                </form>
            </div>
        </div>
    );
}

export default CatalogHeader;