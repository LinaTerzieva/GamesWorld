import styles from './CatalogGameList.module.css';

import CatalogGameItem from "./catalogGameItem/CatalogGameItem";

const CatalogGameList = ({games}) => {
    return (
        <div className={styles.resultsWrapper}>
            {games.map((game) => (
                <CatalogGameItem key={game._id} game={game} />
            ))}
        </div>
    );
}

export default CatalogGameList;