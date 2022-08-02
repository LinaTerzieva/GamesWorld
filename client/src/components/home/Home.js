import Header from '../header/Header';
import Footer from '../footer/Footer';
import Banner from '../banner/Banner';
import GameCardList from '../gameCardList/GameCardList';

const Home = () => {
    return (
        <>
            <Header />
            <Banner />
            <div className="main-wrapper">
                <div className="wrapper">
                    <GameCardList />
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Home;