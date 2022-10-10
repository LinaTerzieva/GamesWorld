export type Product = {
    _id: string,
    title: string,
    description: string,
    cover: string,
    trailer: string,
    discount: number,
    price: number,
    status: string,
    genres: string[]
}

export type CartProduct = {
    gameId: string,
    cover: string,
    title: string,
    price: number,
    quantity: number,
}

export type Cart = {
    expiration: number,
    products: CartProduct[]
}

export type CartContextType = {
    cart: Cart,
    updateCart: (gameId: string, action: string) => Promise<void>,
    removeFromCart: (gameId: string) => void
}

export type Query = {
    query: string | null,
    sortBy: string | null,
    discount: boolean,
    offset: string | null | number,
    pageSize: number,
}
