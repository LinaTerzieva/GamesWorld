import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';

import styles from './Catalog.module.css';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import CatalogHeader from "../catalogHeader/CatalogHeader";
import CatalogFilters from "../catalogFilters/CatalogFilters";
import CatalogSort from "../catalogSort/CatalogSort";
import CatalogGameList from "../catalogGameList/CatalogGameList";
import CatalogPagination from "../catalogPagination/CatalogPagination";

const Catalog = () => {
    const pageSize = 6;
    const baseUrl = 'http://localhost:3030/data/games';

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [query, setQuery] = useState({
        query: searchParams.get('query') ? searchParams.get('query') : "",
        sortBy: searchParams.get('sortBy') ? searchParams.get('sortBy') : "price",
        offset: searchParams.get('offset') ? searchParams.get('offset') : 0,
        discount: searchParams.get('discount') === 'true',
        pageSize: pageSize,
    });

    const [numberOfResults, setNumberOfResults] = useState(0);

    useEffect(() => {

        navigate({
            pathname: "/catalog",
            search: `?${createSearchParams(query)}`
        });

        if (query.discount) {
            fetch(`${baseUrl}?where=title%20LIKE%20${JSON.stringify(query.query)}%20AND%20discount>0&sortBy=${query.sortBy}&offset=${query.offset}&pageSize=${query.pageSize}`)
                .then(response => response.json())
                .then(data => setGames(data));

            fetch(`${baseUrl}?where=title%20LIKE%20${JSON.stringify(query.query)}%20AND%20discount>0&count`)
                .then(response => response.json())
                .then(result => setNumberOfResults(result));
        } else {
            fetch(`${baseUrl}?where=title%20LIKE%20${JSON.stringify(query.query)}&sortBy=${query.sortBy}&offset=${query.offset}&pageSize=${query.pageSize}`)
                .then(response => response.json())
                .then(data => setGames(data));

            fetch(`${baseUrl}?where=title%20LIKE%20${JSON.stringify(query.query)}&count`)
                .then(response => response.json())
                .then(result => setNumberOfResults(result));
        }

    }, [query]);


    return (
        <>
            <Header />
            <div className="main-wrapper">
                <div className="wrapper">
                    <CatalogHeader query={query.query} handleQuery={setQuery} />
                    <div className={styles.catalogContent}>
                        <CatalogFilters handleDiscount={setQuery} />
                        <div className={styles.catalogContentResults}>
                            <CatalogSort handleQuery={setQuery} sortBy={query.sortBy} />
                            <CatalogGameList games={games} />
                            <CatalogPagination numberOfResults={numberOfResults} pageSize={pageSize} handleQuery={setQuery} offset={query.offset} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Catalog;