import { CreatedOrderProduct, OrderProducts, OrderUserInfo } from "./types";
import useHeaders from "./useHeaders";

const useOrderApi = () => {

    const { getHeaders } = useHeaders();

    const createOrder = (order: OrderUserInfo, orderProducts: OrderProducts) => {
        return fetch('http://localhost:3030/data/orders', {
            method: 'POST',
            headers: getHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(order),
        })
            .then((response) => response.json())
            .then((response) => Promise.all(orderProducts.map((product) => { 
                    return createOrderProduct({...product, orderId: response._id});
                }))
            );
    }

    const createOrderProduct = (product: CreatedOrderProduct) => {
        return fetch('http://localhost:3030/data/orderProducts', {
            method: 'POST',
            headers: getHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(product),
        })
            .then((response) => response.json())

    }

    return { createOrder };
}

export default useOrderApi;