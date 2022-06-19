import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Logo from "../assets/img/logo.png";
import {ReactComponent as Basket} from "../assets/img/icons/basket.svg";
import {ReactComponent as LogOut} from "../assets/img/icons/logout.svg";
import {logOut} from "../store/user/actions";
import {clearingCart} from "../store/cart/action";
import "../styles/app.scss";

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutHandle = () => {
        dispatch(logOut());
        dispatch(clearingCart());
        navigate("/login");
        localStorage.removeItem("token");
    }
    return (
        <header className="header">
            <Link className="header__logo" to="/">
                <img className="header__brand" src={Logo}/>
                <h2 className="header__title">TrueGamer</h2>
            </Link>
            <div className="header__links">
                <div className="header__link" onClick={logOutHandle}>
                    <LogOut/>
                </div>
                <div className="header__link">
                    <Link to="/cart"><Basket/></Link>
                </div>
            </div>
        </header>
    );
};

export default Header;

