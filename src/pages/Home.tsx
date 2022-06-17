import React, {useEffect} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {GAMES_API_URL} from "../utils/consts/consts";
import Slider from "../components/Slider";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {setError, setGames, startLoading} from "../store/games/actions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import Loader from "../components/Loader";
import "../styles/home.scss";

const Home = () => {
    const dispatch = useDispatch();
    const {gamesList} = useTypedSelector(state => state.gamesReducer);
    const {isLoading} = useTypedSelector(state => state.gamesReducer);
    useEffect(() => {
        dispatch(startLoading());
        try {
            axios(GAMES_API_URL)
                .then(response => dispatch(setGames(response.data)));
        } catch (e: any){
            dispatch(setError(e));
        }
    }, []);
    return (
        <div className="home">
            <div className="container">
            <Header/>
            <Slider/>
            <h2 className="home__title title">Товары от геймеров - для геймеров</h2>
            <div className="home__games games">
                {!isLoading ? gamesList.map(game => (
                    <Card key={game._id} game={game}/>
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
