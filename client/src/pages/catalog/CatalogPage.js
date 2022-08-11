import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import useGameApi from '../../lib/useGameApi';

import styles from './CatalogPage.module.css';

import CatalogHeader from "../../components/catalogHeader/CatalogHeader";
import CatalogFilters from "../../components/catalogFilters/CatalogFilters";
import CatalogSort from "../../components/catalogSort/CatalogSort";
import CatalogGameList from "../../components/catalogGameList/CatalogGameList";
import CatalogPagination from "../../components/catalogPagination/CatalogPagination";


const CatalogPage = () => {
    const pageSize = 6;

    const { searchGames, countGames } = useGameApi();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [query, setQuery] = useState({
        query: searchParams.get('query') ? searchParams.get('query') : "",
        sortBy: searchParams.get('sortBy') ? searchParams.get('sortBy') : "price",
        discount: searchParams.get('discount') === 'true',
        offset: searchParams.get('offset') ? searchParams.get('offset') : 0,
        pageSize: pageSize,
    });

    const [numberOfResults, setNumberOfResults] = useState(0);

    useEffect(() => {

        navigate({
            pathname: "/catalog",
            search: `?${createSearchParams(query)}`
        });

        searchGames(query.query, query.discount, query.sortBy, query.offset, query.pageSize)
            .then(data => setGames(data));


        countGames(query.query, query.discount)
            .then(result => setNumberOfResults(result));
        

    }, [query]);


    return (
        <>
            <div className="main-wrapper">
                <div className="wrapper">
                    <CatalogHeader query={query.query} handleQuery={setQuery} />
                    <div className={styles.catalogContent}>
                        <CatalogFilters discount={query.discount} pageSize={pageSize} handleDiscount={setQuery} />
                        <div className={styles.catalogContentResults}>
                            <CatalogSort handleQuery={setQuery} sortBy={query.sortBy} />
                            <CatalogGameList games={games} />
                            <CatalogPagination numberOfResults={numberOfResults} pageSize={pageSize} handleQuery={setQuery} offset={query.offset} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CatalogPage;