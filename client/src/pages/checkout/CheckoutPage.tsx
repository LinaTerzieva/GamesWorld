import { useContext, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import NumberFormat from "react-number-format";
import useUserApi from '../../lib/useUserApi';
import AuthenticationContext from "../../lib/AuthenticationContext";

import CartContext from '../../lib/CartContext';
import CartItem from '../../components/cart/cartItem/CartItem';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcMastercard, faCcVisa } from "@fortawesome/free-brands-svg-icons";

import styles from './CheckoutPage.module.css';
import useOrderApi from '../../lib/useOrderApi';
import { AuthContextType, CartContextType, OrderProducts, OrderUserInfo } from '../../lib/types';
import { useNavigate } from 'react-router-dom';

interface IFormInputs {
    fullName: string
    email: string
    address: string
    city: string
    cardName: string
    cardNumber: string
    expYear: string
    cvv: string
}

const CheckoutPage = () => {

    const navigate = useNavigate();
    const { getUserInfo } = useUserApi();
    const { createOrder } = useOrderApi();
    const { auth } = useContext(AuthenticationContext) as AuthContextType;
    const { register, formState: { errors }, handleSubmit, reset, control } = useForm<IFormInputs>();
    const { cart } = useContext(CartContext) as CartContextType;
    const totalPrice: number = cart.products.reduce((total, game) => total += game.price * game.quantity, 0);

    const [authOrder, setAuthOrder] = useState<boolean>(false);

    useEffect(() => {
        getUserInfo()
            .then((data) => {
                if (data.code === 401) {
                    setAuthOrder(false);
                } else {
                    setAuthOrder(true);
                    let defaultValues = {
                        fullName: data.firstName + " " + data.lastName
                    };
                    reset({ ...defaultValues });
                }
            });
    }, [auth.accessToken, auth.id]);


    const submitHandler: SubmitHandler<IFormInputs> = (userInfo: IFormInputs) => {
        const orderProducts: OrderProducts = cart.products.map((product) => {
            return {
                gameId: product.gameId,
                quantity: product.quantity,
                price: product.price
            }
        })

        const orderUserInfo: OrderUserInfo = {
            fullName: userInfo.fullName,
            email: userInfo.email,
            address: userInfo.address,
            city: userInfo.city,
            cardName: userInfo.cardName,
            cardNumber: userInfo.cardNumber,
            expYear: userInfo.expYear,
            cvv: userInfo.cvv,
        }

        createOrder(orderUserInfo, orderProducts)
            .then((response) => {
                const orderId = response[0].orderId;
                navigate(`/thankyou/${orderId}`);
            });
    }

    return (
        <>
            <div className="main-wrapper">
                <div className="large-wrapper">
                    <div className={styles.containerCheckout}>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className={styles.row}>
                                <div className={styles.col50}>
                                    <h3>Billing Details</h3>
                                    <div className={styles.formField}>
                                        <label htmlFor="fname">
                                            Full Name
                                        </label>
                                        {authOrder
                                            ? <input
                                                type="text"
                                                id="fname"
                                                placeholder="First and last name"
                                                {...register("fullName")}
                                                readOnly
                                            />
                                            : <>
                                                <input
                                                    type="text"
                                                    id="fname"
                                                    placeholder="First and last name"
                                                    {...register("fullName", { required: true })}

                                                />
                                                <span className={styles.validationError}>
                                                    {errors.fullName?.type === 'required' && "Full name is required"}
                                                </span>
                                            </>
                                        }
                                    </div>
                                    <div className={styles.formField}>
                                        <label htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            id="email"
                                            placeholder="john@example.com"
                                            {...register("email", {
                                                required: true,
                                                pattern: /[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}/
                                            })}
                                        />
                                        <span className={styles.validationError}>
                                            {errors.email?.type === 'required' && "Email is required"}
                                            {errors.email?.type === 'pattern' && "Email is not valid"}
                                        </span>
                                    </div>
                                    <div className={styles.formField}>
                                        <label htmlFor="adr">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            id="adr"
                                            placeholder="542 W. 15th Street"
                                            {...register("address", { required: true })}
                                        />
                                        <span className={styles.validationError}>
                                            {errors.address?.type === 'required' && "Address is required"}
                                        </span>
                                    </div>
                                    <div className={styles.formField}>
                                        <label htmlFor="city">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            placeholder="Sofia"
                                            {...register("city", { required: true })}
                                        />
                                        <span className={styles.validationError}>
                                            {errors.city?.type === 'required' && "City is required"}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.col50}>
                                    <h3>Payment</h3>
                                    <label htmlFor="cname">Accepted Cards</label>
                                    <div className={styles.iconContainer}>
                                        <FontAwesomeIcon className={styles.cardIcon} icon={faCcVisa} />
                                        <FontAwesomeIcon className={styles.cardIcon} icon={faCcMastercard} />
                                    </div>
                                    <div className={styles.formField}>
                                        <label htmlFor="cname">Name on Card</label>
                                        <input
                                            type="text"
                                            id="cname"
                                            placeholder="John More Doe"
                                            {...register("cardName", { required: true })}
                                        />
                                        <span className={styles.validationError}>
                                            {errors.cardName?.type === 'required' && "Name is required"}
                                        </span>
                                    </div>
                                    <div className={styles.formField}>
                                        <label htmlFor="ccnum">Credit card number</label>
                                        <Controller
                                            control={control}
                                            name="cardNumber"
                                            rules={{
                                                required: true,
                                                pattern: /((\d+) *(\d+) *(\d+) *(\d+))/
                                            }}
                                            render={({ field: { onChange, name, value } }) => (
                                                <NumberFormat
                                                    id="ccnum"
                                                    format="#### #### #### ####"
                                                    placeholder="1111 2222 3333 4444"
                                                    name={name}
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        <span className={styles.validationError}>
                                            {errors.cardNumber?.type === 'required' && "Credit card number is required"}
                                            {errors.cardNumber?.type === 'pattern' && "Please enter a valid credit card number"}
                                        </span>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.col50}>
                                            <div className={styles.formField}>
                                                <label htmlFor="expyear">Card expiration date</label>
                                                <Controller
                                                    control={control}
                                                    name="expYear"
                                                    rules={{
                                                        required: true,
                                                        pattern: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/
                                                    }}
                                                    render={({ field: { onChange, name, value } }) => (
                                                        <NumberFormat
                                                            id="expyear"
                                                            format="##/##"
                                                            placeholder={"MM/YY"}
                                                            name={name}
                                                            value={value}
                                                            onChange={onChange}
                                                        />
                                                    )}
                                                />
                                                <span className={styles.validationError}>
                                                    {errors.expYear?.type === 'required' && "This field is required"}
                                                    {errors.expYear?.type === 'pattern' && "Please enter a valid expiration year"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={styles.col50}>
                                            <div className={styles.formField}>
                                                <label htmlFor="cvv">CVV</label>
                                                <input
                                                    type="number"
                                                    placeholder="352"
                                                    {...register("cvv", {
                                                        required: true,
                                                        pattern: /^[0-9]{3}$/
                                                    })}
                                                />
                                                <span className={styles.validationError}>
                                                    {errors.cvv?.type === 'required' && "This field is required"}
                                                    {errors.cvv?.type === 'pattern' && "Please enter a valid cvv"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.orderBox}>
                                    <h3>Order Summary</h3>
                                    {cart.products.map((game) => {
                                        return <CartItem key={game.gameId} game={game} isStatic={true} />
                                    })}
                                    <div className={styles.orderTotal}>
                                        Total: {totalPrice.toFixed(2)}€
                                    </div>
                                </div>
                            </div>
                            <div className={styles.btnBox}>
                                <input
                                    type="submit"
                                    value="Place order"
                                    className={styles.btn}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;