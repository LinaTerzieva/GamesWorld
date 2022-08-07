import { Link } from 'react-router-dom';

import styles from './GameCardItem.module.css';

const GameCardItem = ({game}) => {

    return (
        <div className={styles.productsWidgetCard}>
            <a className={styles.productsWidgetCardLink} href="">
                <img
                    className={styles.productsWidgetCardImg}
                    src={`/images/games/${game.cover}`}
                    alt={game.title}
                />
            </a>
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