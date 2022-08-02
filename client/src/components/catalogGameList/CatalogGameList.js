
import CatalogGameItem from "./catalogGameItem/CatalogGameItem";

const CatalogGameList = ({games}) => {
    return (
        <div className="results__wrapper">
            {games.map((game) => (
                <CatalogGameItem key={game._id} game={game} />
            ))}
        </div>
    );
}

export default CatalogGameList;