import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

import styles from './UserMenu.module.css'

const UserMenu = () => {
    return (
        <div className={styles.headerUserMenu}>
            <div className={`${styles.userMenuItem} ${styles.userMenuItemCart}`}>
                <label className={styles.userMenuItemCartLabel}>
                    <a className={`${styles.userMenuLink} link`}>Cart</a>
                    <FontAwesomeIcon className={styles.userMenuIcon} icon={faCartShopping} />
                </label>
                <span className={`${styles.userMenuItemCartCount} position-absolute top-0 start-100 translate-middle badge rounded-pill`}>
                    0
                </span>
                {/* <div className="cart-content">
                            <div className="cart-header heading-small px-4 py-3">
                            Your shopping cart
                            </div>
                            <div className="cart-item py-3 px-2">
                            <div className="cart-item__name">World of Warcraft</div>
                            <div className="cart-item__price">20.99€</div>
                            <button className="cart-item__remove-button">
                                <i className="fa-solid fa-xmark text-white" />
                            </button>
                            </div>
                            <div className="cart-item py-3 px-2">
                            <div className="cart-item__name">Heroes of the storm</div>
                            <div className="cart-item__price">15.09€</div>
                            <button className="cart-item__remove-button">
                                <i className="fa-solid fa-xmark text-white" />
                            </button>
                            </div>
                            <div className="cart-total pt-3 pb-2 px-2">
                            <div className="cart-total__price">36.08€</div>
                            <div className="cart-total__title">Total</div>
                            </div>
                            <div className="cart-checkout py-3 px-2">
                            <a href="" className="cart-checkout__btn link">
                                Go To Checkout
                            </a>
                            </div>
                        </div> */}
            </div>
            <div className={styles.userMenuItem}>
                <a className={`${styles.userMenuLink} link`} href="">
                    Log in
                </a>
                <FontAwesomeIcon className={styles.userMenuIcon} icon={faUser} />
            </div>
        </div>
    );
}

export default UserMenu;