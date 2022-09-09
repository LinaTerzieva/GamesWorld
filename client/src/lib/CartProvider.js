import { ADD_TO_CART_INCREASE, ADD_TO_CART_DECREASE, CART_EXPIRATION_LIMIT } from "./Constants";

import CartContext from "./CartContext";
import useGameApi from "./useGameApi";


import useSessionStorage from "./useSessionStorage";

export const CartProvider = ({ children }) => {
    const now = new Date();

    const [cart, setCart] = useSessionStorage("cart", { products:[] });

    const { getGame } = useGameApi();

    const updateCart = (gameId, action) => getGame(gameId)
        .then(data => {
            // passing function to setCart method
            //if the game exists
            if (cart.products.find(obj => obj.gameId == gameId)) {
                const tempProducts = cart.products.map(obj => {
                    // if id equals 2, update country property
                    if (obj.gameId === gameId && action == ADD_TO_CART_INCREASE) {
                        return { ...obj, quantity: obj.quantity + 1 };
                    } else if (obj.gameId === gameId && action == ADD_TO_CART_DECREASE && obj.quantity > 1) {
                        return { ...obj, quantity: obj.quantity - 1 };
                    }

                    // otherwise return object as is
                    return obj;
                });

                setCart({
                    ...cart,
                    products: tempProducts
                });
            } else {
                const tempCart = {
                    expiration: now.getTime() + CART_EXPIRATION_LIMIT,
                    products: [
                        ...cart.products,
                        {
                            gameId: data._id,
                            cover: data.cover,
                            title: data.title,
                            price: data.price,
                            quantity: 1,
                        }
                    ]
                }
                setCart(tempCart);
            }
        });

    const removeFromCart = (gameId) => {
        const tempCart = cart.products.filter(obj => obj.gameId !== gameId);
        setCart({
            ...cart,
            products: tempCart
        });
    }

    return (
        <CartContext.Provider value={{ cart, updateCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}