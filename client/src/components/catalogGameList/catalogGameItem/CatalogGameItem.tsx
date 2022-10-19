import { Link } from 'react-router-dom';
import { Product } from '../../../lib/types';

import styles from './CatalogGameItem.module.css';


const CatalogGameItem = ({ game }: {game: Product}): JSX.Element => {

    let price: number = game.price;
    let convertedPrice: string = game.price.toFixed(2);
    let finalPrice: string = (price - game.discount).toFixed(2);

    return (
        <div className={styles.resultsCardWrapper}>
            <div className={styles.resultsCard}>
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
                                {convertedPrice}€
                            </div>
                        </div>
                        : <div className={styles.resultsCardPrice}>
                            <div className={styles.resultsCardPriceBase}>
                                {convertedPrice}
                            </div>
                            <div className={styles.resultsCardPriceFinal}>
                                {finalPrice}€
                            </div>
                        </div>
                    }

                    <div className={styles.resultsCardAddToCart}>
                        <button className={styles.detailButton} style={{ background: "linear-gradient(#c026d37a, #7c3aed91)" }}>
                            <Link to={`/detail/${game._id}`} className={styles.detailButtonLink}>
                                View
                            </Link>
                        </button>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default CatalogGameItem;