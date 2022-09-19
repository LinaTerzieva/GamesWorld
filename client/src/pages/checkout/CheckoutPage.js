import { useContext, useEffect, useState } from 'react';
import useUserApi from './../../lib/useUserApi';
import AuthenticationContext from "../../lib/AuthenticationContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcMastercard, faCcVisa } from "@fortawesome/free-brands-svg-icons";

import styles from './CheckoutPage.module.css';


const CheckoutPage = () => {

    const { getUserInfo } = useUserApi();
    const { auth } = useContext(AuthenticationContext);
    const [checkoutData, setCheckoutData] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        cardName: "",
        cardNumber: "",
        expYear: "",
        cvv: "",
    });

    useEffect(() => {
        getUserInfo()
            .then(data => setCheckoutData({
                ...checkoutData,
                fullName: data.firstName + " " + data.lastName
            }));

    }, [auth.accessToken, auth.id])

    const handleChange = (e) => {
        const value = e.target.value;
        setCheckoutData({
            ...checkoutData,
            [e.target.name]:value
        })
    }

    return (
        <>
            <div className="main-wrapper">
                <div className="large-wrapper">
                    <div className={styles.containerCheckout}>
                        <form>
                            <div className={styles.row}>
                                <div className={styles.col50}>
                                    <h3>Billing Details</h3>
                                    <label htmlFor="fname">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fname"
                                        name="fullName"
                                        placeholder="John M. Doe"
                                        value={checkoutData.fullName}
                                    />
                                    <label htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="john@example.com"
                                    />
                                    <label htmlFor="adr">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="adr"
                                        name="address"
                                        placeholder="542 W. 15th Street"
                                    />
                                    <label htmlFor="city">
                                        City
                                    </label>
                                    <input type="text" id="city" name="city" placeholder="Sofia" />

                                </div>
                                <div className={styles.col50}>
                                    <h3>Payment</h3>
                                    <label htmlFor="fname">Accepted Cards</label>
                                    <div className={styles.iconContainer}>
                                        <FontAwesomeIcon icon={faCcVisa} />
                                        <FontAwesomeIcon icon={faCcMastercard} />
                                    </div>
                                    <label htmlFor="cname">Name on Card</label>
                                    <input
                                        type="text"
                                        id="cname"
                                        name="cardname"
                                        placeholder="John More Doe"
                                    />
                                    <label htmlFor="ccnum">Credit card number</label>
                                    <input
                                        type="text"
                                        id="ccnum"
                                        name="cardnumber"
                                        placeholder="1111-2222-3333-4444"
                                    />
                                    <div className={styles.row}>
                                        <div className={styles.col50}>
                                            <label htmlFor="expyear">Exp Year</label>
                                            <input
                                                type="text"
                                                id="expyear"
                                                name="expyear"
                                                placeholder={2018}
                                            />
                                        </div>
                                        <div className={styles.col50}>
                                            <label htmlFor="cvv">CVV</label>
                                            <input type="text" id="cvv" name="cvv" placeholder={352} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col75}>
                                    <h3>Order Summary</h3>
                                </div>
                            </div>
                            <input
                                type="submit"
                                defaultValue="Continue to checkout"
                                className={styles.btn}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;