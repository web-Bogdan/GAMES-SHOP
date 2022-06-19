import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {ReactComponent as Minus} from "../assets/img/icons/minus.svg";
import {ReactComponent as Plus} from "../assets/img/icons/plus.svg";
import {ReactComponent as Buy} from "../assets/img/icons/cart.svg";
import {decrementHome, incrementHome} from "../store/games/actions";
import {addToCart, decrementCart, incrementCart} from "../store/cart/action";
import {IGame} from "../store/games/reducer";
import "../styles/app.scss";

interface ICard {
    game: IGame;
    type: "HOME" | "CART"
}

const Card: React.FC<ICard> = ({game, type}) => {
    const dispatch = useDispatch();
    // Highlights button
    const [isActive, setIsActive] = useState<boolean>(false);
    const incrementCount = () => {
        switch (type){
            case "HOME":
                // Home increment
                return dispatch(incrementHome(game._id));
            case "CART":
                // Cart increment
                return dispatch(incrementCart(game._id));
            default:
                return null;
        }

    };
    const decrementCount = () => {
        if (game.count <= 1){
            return false;
        }
        switch (type){
            case "HOME":
                // Home increment
                return dispatch(decrementHome(game._id));
            case "CART":
                // Cart increment
                return dispatch(decrementCart(game._id));
            default:
                return null;
        }
    };
    const addGame = () => {
        setIsActive(true);
        dispatch(addToCart(game));
    }
    const hideBtn = () => {
        setIsActive(false);
    }
    return (
        <div className="game">
            <div className="game__left">
                <img className="game__logo" src={game.url} alt="game logo"/>
            </div>
            <div className="game__right">
                <div className="game__name">{game.name}</div>
                <div className="game__counting">
                    <div className="circle" onClick={decrementCount}><Minus/></div>
                    <span className="game__count">{game.count}</span>
                    <div className="circle" onClick={incrementCount}><Plus/></div>
                </div>
                <div className="game__footer">
                    <div className="game__price">
                        <h5>{game.price} рублей</h5>
                    </div>
                    <div className={isActive ? "game__btn game__btn-active" : "game__btn"} onMouseDown={() => addGame()} onMouseUp={hideBtn}>
                        <Buy className="game__btn"/>
                        <span className="game__active"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
