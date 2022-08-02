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
            <a className={styles.productsWidgetCardButtonLink} href="">
                <div className={styles.productsWidgetCardButtonText}> View </div>
            </a>
        </div>
    );
}

export default GameCardItem;