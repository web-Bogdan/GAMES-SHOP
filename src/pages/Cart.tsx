import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import axios from "axios";
import Header from "../components/Header";
import Card from "../components/Card";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {setError, setGames, startLoading} from "../store/games/actions";
import {GAMES_API_URL} from "../utils/consts/consts";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import {clearingCart} from "../store/cart/action";
import "../styles/cart.scss";

const Cart = () => {
    const dispatch = useDispatch();
    const {cartList} = useTypedSelector(state => state.cartReducer);
    const clearCart = () => {
        dispatch(clearingCart());
    }
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
        <div className="cart">
           <div className="container">
               <Header></Header>
               <h2 className="title">Корзина</h2>
               <div className="cart__games games">
                   {cartList.length ? cartList.map(game => (
                       <Card key={game._id} game={game} type="CART"/>
                   ))
                       :
                       <div className="cart__text">Корзина пуста, но вы можете <Link to="/" style={{textDecoration: "none"}}>добавить сюда игры</Link></div>
                   }
               </div>
               {cartList.length && (
                   <div className="cart__buy">
                       <div className="cart__buttons">
                           <button className="cart__btn btn" onClick={clearCart}>Очистить корзину</button>
                           <button className="btn">Оплатить</button>
                       </div>
                   </div>
               )}
           </div>
            <Footer/>
        </div>
    );
};

// @ts-ignore
export default Cart;
