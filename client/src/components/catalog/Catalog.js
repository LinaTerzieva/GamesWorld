import { useState, useEffect } from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import CatalogHeader from "../catalogHeader/catalogHeader";
import CatalogFilters from "../catalogFilters/CatalogFilters";
import CatalogSort from "../catalogSort/CatalogSort";
import CatalogGameList from "../catalogGameList/CatalogGameList";
import CatalogPagination from "../catalogPagination/CatalogPagination";

const Catalog = () => {

    const [games, setGames] = useState([]);
    const [offset, setOffset] = useState(0);
    const [numberOfResults, setNumberOfResults] = useState(0);

    const baseUrl = 'http://localhost:3030/data/games';
    const pageSize = 6;

    useEffect(() => {
        fetch(`${baseUrl}?offset=${offset}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(data => setGames(data));

        fetch(`${baseUrl}?count`)
            .then(response => response.json())
            .then(result => setNumberOfResults(result));
    }, [offset]);

    console.log(offset);

    return (
        <>
            <Header />
            <div className="main-wrapper">
                <div className="wrapper">
                    <CatalogHeader />
                    <div className="catalog-content">
                        <CatalogFilters />
                        <div className="catalog-content__results">
                            <CatalogSort />
                            <CatalogGameList games={games} />
                            <CatalogPagination numberOfResults={numberOfResults} pageSize={pageSize} handleOffset={setOffset}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Catalog;