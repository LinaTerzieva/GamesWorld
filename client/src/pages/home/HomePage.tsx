import Banner from '../../components/banner/Banner';
import GameCardList from '../../components/gameCardList/GameCardList';

const HomePage = (): JSX.Element => {
    return (
        <>
            <Banner />
            <div className="main-wrapper">
                <div className="wrapper">
                    <GameCardList />
                </div>
            </div>
        </>
    );
}

export default HomePage;