import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import Slider from "../components/Slider";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {setError, setGames, startLoading} from "../store/games/actions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import Loader from "../components/Loader";
import {GamesApi} from "../http/gamesApi";
import "../styles/home.scss";

const Home = () => {
    const dispatch = useDispatch();
    const {gamesList, gamesIsLoading, isFirstLoading} = useTypedSelector(state => state.gamesReducer);
    useEffect(() => {
        if (isFirstLoading){
            console.log(gamesIsLoading);
            dispatch(startLoading());
            console.log(gamesIsLoading);
            try {
                GamesApi.loadingGames()
                    .then(response => dispatch(setGames(response.data)))
                    .then(() => console.log(gamesIsLoading));
            } catch (e: any){
                dispatch(setError(e));
            }
        }
    }, [dispatch, isFirstLoading]);
    return (
        <div className="home">
            <div className="container">
            <Header/>
            <Slider/>
            <h2 className="home__title title">Товары от геймеров - для геймеров</h2>
            <div className="home__games games">
                {!gamesIsLoading ? gamesList.map(game => (
                    <Card key={game._id} game={game} type="HOME"/>
                ))
                    :
                    <Loader/>
                }
            </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
