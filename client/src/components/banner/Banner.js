import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from './Banner.module.css';

const Banner = () => {
    return (
        <div className={styles.banner} style={{backgroundImage: `url(${'/images/banner.jpg'})`}}>
            <div className={styles.bannerTitle}>
                <span className={styles.bold}>Discover</span> your next favorite game
            </div>
            <div className={styles.bannerSearch}>
                <input
                    className={styles.bannerSearchInput}
                    type="search"
                    placeholder="Search shop"
                />
                <button className={styles.bannerSearchButton}>
                    <FontAwesomeIcon className={styles.bannerSearchButtonImage} icon={faMagnifyingGlass}/>
                </button>
            </div>
        </div>

    );
}

export default Banner;