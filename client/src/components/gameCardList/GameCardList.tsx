import { useEffect, useState } from "react";

import styles from './GameCardList.module.css';

import GameCardItem from "./gameCardItem/GameCardItem";
import { UpcomingProducts } from "../../lib/types";


const GameCardList = (): JSX.Element => {

    const [upcomingGames, setUpcomingGames] = useState<UpcomingProducts>([]);

    useEffect(() => {
        fetch('http://localhost:3030/data/games?where=status IN ("Upcoming")')
            .then(response => response.json())
            .then(data => setUpcomingGames(data));

    }, []);

    return (
        <div className={styles.widgetContainer}>
            <div className={styles.productsWidget}>
                <div className={styles.productsWidgetTitle}>
                    Upcoming Games
                </div>
                <div className={styles.productsWidgetCards}>
                    {upcomingGames.map((game) => (
                        <GameCardItem key={game._id} game={game} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GameCardList;