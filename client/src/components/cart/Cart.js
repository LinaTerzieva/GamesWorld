import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from './Cart.module.css';

const Cart = () => {
    return (
        <Card className={styles.cart}>
            <Card.Header className={`${styles.cartHeader} px-4 py-3`} as="h5">Your shopping cart</Card.Header>
            <Card.Body className={styles.cardBody}>
                <div className={styles.cartItems}>
                    <div className={`${styles.cartItem} py-3 px-2`}>
                        <div className={styles.cartItemCover}>
                            <img width="100px" height="60px" />
                        </div>
                        <div className={styles.cartItemName}>
                            HELLO 
                        </div>
                        <div className={styles.cartItemPrice}>
                            50.00
                        </div>
                        <button>
                            <FontAwesomeIcon className={styles.cartItemRemoveButton} icon={faXmark} />
                        </button>
                    </div>
                    <div className={`${styles.cartItem} py-3 px-2`}>
                        <div className={styles.cartItemCover}>
                            <img width="100px" height="60px" />
                        </div>
                        <div className={styles.cartItemName}>
                            HELLO 
                        </div>
                        <div className={styles.cartItemPrice}>
                            50.00
                        </div>
                        <button>
                            <FontAwesomeIcon className={styles.cartItemRemoveButton} icon={faXmark} />
                        </button>
                    </div>
                </div>
                <div className={`${styles.cartTotal} pt-3 pb-2 px-4`}>
                    <div className={styles.cartTotalPrice}>
                        100.00
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
            </Card.Body>
        </Card>
    );
}

export default Cart;