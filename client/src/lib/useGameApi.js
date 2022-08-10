

const useGameApi = () => {

    const getGame = (gameId) => {
        return fetch(`http://localhost:3030/data/games/${gameId}`)
            .then(response => response.json())
    }


    return { getGame };
}

export default useGameApi;