import { useState } from "react";
import CartContext from "./CartContext";
import useGameApi from "./useGameApi";

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const { getGame } = useGameApi();


    const addToCart = (gameId) => getGame(gameId)
        .then(data => {

            // passing function to setCart method
            setCart(prevState => {

                //if the game exists
                if (prevState.find(obj => obj.gameId == gameId)) {
                    return prevState.map(obj => {
                        // if id equals 2, update country property
                        if (obj.gameId === gameId) {
                            return { ...obj, quantity: obj.quantity + 1 };
                        }

                        // otherwise return object as is
                        return obj;
                    });
                }

                //if the game does not exist
                return [...prevState, {
                    gameId: data._id,
                    cover: data.cover,
                    title: data.title,
                    price: data.price,
                    quantity: 1,
                }];

            });

        });

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}