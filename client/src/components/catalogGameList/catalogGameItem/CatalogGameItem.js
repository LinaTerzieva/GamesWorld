import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const CatalogGameItem = ({game}) => {
    return (
        <div className="results__card">
            <a className="results__card-link link" href="">
                <div className="results__card-img-wrapper">
                    <img
                        className="results__card-img"
                        src={`/images/games/${game.cover}`}
                        alt={game.title}
                    />
                </div>
                <div className="results__card-title">
                    {game.title}
                </div>
                <div className="results__card-content">
                    <div className="results__card-price">
                        {game.price}
                        <div className="results__card-price--base">

                        </div>
                        <div className="results__card-price--final">

                        </div>

                        <div className="results__card-price--final">

                        </div>

                    </div>
                    <div className="results__card-add-to-cart">
                        <button className="add-to-cart__button">
                            <FontAwesomeIcon className="add-to-cart__img" icon={faCartShopping} />
                        </button>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default CatalogGameItem;