import { ADD_TO_CART_INCREASE, ADD_TO_CART_DECREASE } from "./../../../lib/Constants";
import { useContext } from "react";
import CartContext from "../../../lib/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from './CartItem.module.css';

const CartItem = ({ game, isStatic }) => {

    const { updateCart, removeFromCart } = useContext(CartContext);

    const quantity = game.quantity;
    const price = parseFloat(game.price).toFixed(2);
    const totalPrice = (price * quantity).toFixed(2);

    const incrGameQuantity = () => {
        updateCart(game.gameId, ADD_TO_CART_INCREASE);
    }

    const decrGameQuantity = () => {
        updateCart(game.gameId, ADD_TO_CART_DECREASE);
    }

    const deleteGameFromCart = () => {
        removeFromCart(game.gameId);
    }

    return (
        <div className={`${styles.cartItem} py-3 px-2`}>
            <div className={styles.cartItemCover}>
                <img src={`/images/games/${game.cover}`} width="60px" height="70px" />
            </div>
            <div className={styles.cartItemName}>
                {game.title}
            </div>
            {!isStatic &&
                <button className={styles.decrBtn} onClick={decrGameQuantity}><FontAwesomeIcon icon={faMinus} /></button>
            }
            <div className={styles.cartItemQuantity}>
                {game.quantity}
            </div>
            {!isStatic &&
                <button className={styles.incrBtn} onClick={incrGameQuantity}><FontAwesomeIcon icon={faPlus} /></button>
            }
            <div className={styles.cartItemPrice}>
                {totalPrice}€
            </div>
            {!isStatic &&
                <button onClick={deleteGameFromCart}>
                    <FontAwesomeIcon className={styles.cartItemRemoveIcon} icon={faXmark} />
                </button>
            }
        </div>
    );
}

export default CartItem;