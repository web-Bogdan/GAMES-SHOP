import React from 'react';
import {useDispatch} from "react-redux";
import {ReactComponent as Minus} from "../assets/img/icons/minus.svg";
import {ReactComponent as Plus} from "../assets/img/icons/plus.svg";
import {ReactComponent as Buy} from "../assets/img/icons/cart.svg";
import {decrement, increment} from "../store/games/actions";
import {addToCart} from "../store/cart/action";
import "../styles/app.scss";

const Card: React.FC<any> = ({game}) => {
    const dispatch = useDispatch();
    const incrementCount = () => {
        if (game.count >= 20){
            return false;
        }
        dispatch(increment(game._id));
    };
    const decrementCount = () => {
        if (game.count <= 1){
            return false;
        }
        dispatch(decrement(game._id));
    };
    const addGame = () => {
        dispatch(addToCart(game));
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
                    <div className="game__btn" onClick={() => addGame()}>
                        <Buy className="game__btn"/>
                        <span className="game__active"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
