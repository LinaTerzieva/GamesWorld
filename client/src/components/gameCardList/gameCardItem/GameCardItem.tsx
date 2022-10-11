import { Link } from 'react-router-dom';
import { Product } from '../../../lib/types';

import styles from './GameCardItem.module.css';

const GameCardItem = ({game}: {game: Product}): JSX.Element => {

    return (
        <div className={styles.productsWidgetCard}>
            <Link to={`/detail/${game._id}`} className={styles.productsWidgetCardLink}>
                <img
                    className={styles.productsWidgetCardImg}
                    src={`/images/games/${game.cover}`}
                    alt={game.title}
                />
            </Link>
            <div className={styles.productsWidgetCardTitle}>
                {game.title}
            </div>
            <Link to={`/detail/${game._id}`} className={styles.productsWidgetCardButtonLink}>
                <div className={styles.productsWidgetCardButtonText}> View </div>
            </Link>
        </div>
    );
}

export default GameCardItem;