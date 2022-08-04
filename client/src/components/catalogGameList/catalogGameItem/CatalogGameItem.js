import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import styles from './CatalogGameItem.module.css';

const CatalogGameItem = ({ game }) => {

    var price = parseFloat(game.price).toFixed(2);

    return (
        <div className={styles.resultsCard}>
            <a className={`${styles.resultsCardLink} link`} href="">
                <div className={styles.resultsCardImgWrapper}>
                    <img
                        className={styles.resultsCardImg}
                        src={`/images/games/${game.cover}`}
                        alt={game.title}
                    />
                </div>
                <div className={styles.resultsCardTitle}>
                    {game.title}
                </div>
                <div className={styles.resultsCardContent}>

                    {game.discount == 0
                        ? <div className={styles.resultsCardPrice}>
                            <div className={styles.resultsCardPriceFinal}>
                                {price}€
                            </div>
                        </div>
                        : <div className={styles.resultsCardPrice}>
                            <div className={styles.resultsCardPriceBase}>
                                {price}
                            </div>
                            <div className={styles.resultsCardPriceFinal}>
                                {parseFloat(price - game.discount).toFixed(2)}€
                            </div>
                        </div>
                    }

                    <div className={styles.resultsCardAddToCart}>
                        <button className={styles.addToCartButton} style={{ background: "linear-gradient(#c026d37a, #7c3aed91)" }}>
                            <FontAwesomeIcon className={styles.addToCartImg} icon={faCartShopping} />
                        </button>
                    </div>
                </div>
            </a >
        </div >
    );
}

export default CatalogGameItem;