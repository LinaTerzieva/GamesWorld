import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from './Banner.module.css';

const Banner = () => {
    let navigate = useNavigate();

    const [searchValue, setSearchvalue] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchvalue(e.target.value);
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        navigate(`/catalog?query=${searchValue}`, { replace: false });
    }

    return (
        <div className={styles.banner} style={{ backgroundImage: `url(${'/images/banner.jpg'})` }}>
            <div className={styles.bannerTitle}>
                <span className={styles.bold}>Discover</span> your next favorite game
            </div>
            <form className={styles.bannerSearch} onSubmit={submitHandler}>
                <input
                    className={styles.bannerSearchInput}
                    type="search"
                    placeholder="Search shop"
                    value={searchValue}
                    onChange={handleInputChange}
                />
                <button className={styles.bannerSearchButton}>
                    <FontAwesomeIcon className={styles.bannerSearchButtonImage} icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>

    );
}

export default Banner;