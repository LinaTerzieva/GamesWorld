import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const catalogHeader = () => {
    return (
        <div className="catalog-header">
            <div className="catalog-title">
                All Games
            </div>
            <div className="catalog-search">
                <form className="search">
                    <input
                        className="catalog-search__input"
                        type="search"
                        placeholder="Search shop"
                    />
                    <FontAwesomeIcon className="catalog-search__image" icon={faMagnifyingGlass} />
                </form>
            </div>
        </div>
    );
}

export default catalogHeader;