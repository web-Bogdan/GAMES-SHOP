import React from 'react';
import {Carousel} from "react-bootstrap";
import loadingSlider from "../assets/img/loadingSlider.webp";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {addToCart} from "../store/cart/action";
import {useDispatch} from "react-redux";
import {IGame} from "../store/games/reducer";
import "../styles/app.scss";

const Slider: React.FC = () => {
    const {hotGames, gamesIsLoading} = useTypedSelector(state => state.gamesReducer);
    const dispatch = useDispatch();
    const addGame = (game: IGame): void => {
        dispatch(addToCart(game));
    }
    return (
        <Carousel>
            {!gamesIsLoading ? hotGames.length && hotGames.map(game => (
                    <Carousel.Item key={game._id}>
                        <img
                            className="d-block w-100"
                            src={game.url}
                            alt={game.name}
                        />
                        <Carousel.Caption>
                            <h3>{game.name}</h3>
                            <p className="text">Стоимость игры {game.price} рублей.</p>
                            <button className="btn btn-small" onClick={() => addGame(game)}>Купить игру</button>
                        </Carousel.Caption>
                    </Carousel.Item>
            ))
            :
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={loadingSlider}
                        alt="Загрузка..."
                    />
                </Carousel.Item>
            }
        </Carousel>
    );
};

export default Slider;
