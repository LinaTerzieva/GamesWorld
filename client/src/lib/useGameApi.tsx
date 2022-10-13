import { ApiError, Product } from "./types";

const useGameApi = () => {

    const baseUrl = "http://localhost:3030/data/games";

    const getGame = (gameId: string): Promise<Product> => {
        return fetch(`${baseUrl}/${gameId}`)
            .then((response: Response) => {
                if (!response.ok) {
                    throw response.json() as Promise<ApiError>;
                }

                return response.json() as Promise<Product>;
            });
    }

    const searchGames = (title:string | null, showDiscount:boolean, sortBy:string | null, offset:string | null | number, pageSize:number): Promise<Product[]> => {

        let where = `where=title%20LIKE%20${JSON.stringify(title)}`;

        if(showDiscount) {
            where += "%20AND%20discount>0";
        }
        
        return fetch(`${baseUrl}?${where}&sortBy=${sortBy}&offset=${offset}&pageSize=${pageSize}`)
                .then(response => response.json())
    }

    const countGames = (title: string | null, showDiscount: boolean): Promise<number> => {

        let where = `where=title%20LIKE%20${JSON.stringify(title)}`;

        if(showDiscount) {
            where += "%20AND%20discount>0";
        }

        return fetch(`${baseUrl}?${where}&count`)
                .then(response => response.json())
    }

    return { getGame, searchGames, countGames};
}

export default useGameApi;