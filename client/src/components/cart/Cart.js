import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../lib/CartContext';

import Card from 'react-bootstrap/Card';

import CartItem from './cartItem/CartItem';

import styles from './Cart.module.css';

const Cart = () => {

    const { cart } = useContext(CartContext);

    const totalPrice = cart.products.reduce((a, game) => a += game.price * game.quantity, 0);

    return (
        <Card className={styles.cart}>
            <Card.Header className={`${styles.cartHeader} px-4 py-3`} as="h5">Your shopping cart</Card.Header>
            <Card.Body className={styles.cardBody}>
                {cart.products.length
                    ? <>
                        <div className={styles.cartItems}>
                            {cart.products.map((game) => {
                                return <CartItem key={game.gameId} game={game} />
                            })}
                        </div>
                        <div className={`${styles.cartTotal} pt-3 pb-2 px-4`}>
                            <div className={styles.cartTotalPrice}>
                                {totalPrice.toFixed(2)}€
                            </div>
                            <div className={styles.cartTotalTitle}>
                                Total
                            </div>
                        </div>
                        <div className={`${styles.cartCheckout} py-3 px-2`}>
                            <button className={styles.cartCheckoutBtn}>
                                Go To Checkout
                            </button>
                        </div>
                    </>
                    : <div className={styles.cartEmptyMsg}>
                        <div className={styles.cartEmptyMsgTitle}>
                            Your cart is currently empty.
                        </div>
                        <div className={styles.cartEmptyMsgDscr}>
                            Before proceed to checkout you must add some products to your shopping cart.
                        </div>
                        <div className={styles.cartShopBox}>
                            <Link to='/catalog' className={styles.cartShopLink}>
                                Shop now
                            </Link>
                        </div>
                    </div>
                }

            </Card.Body>
        </Card>
    );
}

export default Cart;