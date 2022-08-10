

const useGameApi = () => {

    const baseUrl = "http://localhost:3030/data/games";

    const getGame = (gameId) => {
        return fetch(`${baseUrl}/${gameId}`)
            .then(response => response.json())
    }

    const searchGames = (title, showDiscount, sortBy, offset, pageSize) => {

        let where = `where=title%20LIKE%20${JSON.stringify(title)}`;

        if(showDiscount) {
            where += "%20AND%20discount>0";
        }
        
        return fetch(`${baseUrl}?${where}&sortBy=${sortBy}&offset=${offset}&pageSize=${pageSize}`)
                .then(response => response.json())
    }

    const countGames = (title, showDiscount) => {

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