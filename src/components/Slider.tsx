import React from 'react';
import {Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import loadingSlider from "../assets/img/loadingSlider.webp";
import {useTypedSelector} from "../hooks/useTypedSelector";
import "../styles/app.scss";
import {addToCart} from "../store/cart/action";
import {useDispatch} from "react-redux";
import {IGame} from "../store/games/reducer";

const Slider = () => {
    const {hotGames} = useTypedSelector(state => state.gamesReducer);
    const {isLoading} = useTypedSelector(state => state.gamesReducer);
    const dispatch = useDispatch();
    const addGame = (game: IGame): void => {
        dispatch(addToCart(game));
    }
    return (
        <Carousel>
            {!isLoading ? hotGames.length && hotGames.map(game => (
                    <Carousel.Item key={game._id}>
                        <img
                            className="d-block w-100"
                            src={game.url}
                            alt={game.name}
                        />
                        <Carousel.Caption>
                            <h3>{game.name}</h3>
                            <p className="text">Стоиомсть игры {game.price} рублей.</p>
                            <Link className="btn btn-small" onClick={() => addGame(game)} to="/game">Купить игру</Link>
                        </Carousel.Caption>
                    </Carousel.Item>
            ))
            :
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={loadingSlider}
                        alt={"Загрузка..."}
                    />
                </Carousel.Item>
            }
        </Carousel>
    );
};

export default Slider;
