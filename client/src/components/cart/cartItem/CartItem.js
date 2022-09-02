import { useContext } from "react";
import CartContext from "../../../lib/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from './CartItem.module.css';

const CartItem = ({game}) => {

    const { removeFromCart } = useContext(CartContext);

    const quantity = game.quantity;
    const price = parseFloat(game.price).toFixed(2);
    const totalPrice = (price*quantity).toFixed(2);

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
            <div className={styles.cartItemQuantity}>
                x {game.quantity}
            </div>
            <div className={styles.cartItemPrice}>
                {totalPrice}€
            </div>
            <button onClick={deleteGameFromCart}>
                <FontAwesomeIcon className={styles.cartItemRemoveIcon} icon={faXmark} />
            </button>
        </div>
    );
}

export default CartItem;