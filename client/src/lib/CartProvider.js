import CartContext from "./CartContext";
import useGameApi from "./useGameApi";

import useSessionStorage from "./useSessionStorage";

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useSessionStorage("cart", []);

    const { getGame } = useGameApi();

    const addToCart = (gameId) => getGame(gameId)
        .then(data => {

            // passing function to setCart method
            //if the game exists
            if (cart.find(obj => obj.gameId == gameId)) {
                const tempCart = cart.map(obj => {
                    // if id equals 2, update country property
                    if (obj.gameId === gameId) {
                        return { ...obj, quantity: obj.quantity + 1 };
                    }

                    // otherwise return object as is
                    return obj;
                });

                setCart(tempCart);
            }
            else {

                //if the game does not exist
                const tempCart = [...cart, {
                    gameId: data._id,
                    cover: data.cover,
                    title: data.title,
                    price: data.price,
                    quantity: 1,
                }];
    
                setCart(tempCart);
            }

        });

    const removeFromCart = (gameId) => {
        const tempCart = cart.filter(obj => obj.gameId !== gameId);
        setCart(tempCart);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}