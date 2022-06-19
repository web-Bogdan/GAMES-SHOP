import React, {useEffect} from 'react';
import "./styles/app.scss";
import LogIn from "./pages/LogIn";
import Registration from "./pages/Registration";
import {Routes, Route} from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {setLoading, setUser} from "./store/user/actions";
import {UserApi} from "./http/userApi";
import Loader from "./components/Loader";


function App() {
  const {isAuth} = useTypedSelector(state => state.userReducer);
  const dispatch = useDispatch();
    const {userIsLoading} = useTypedSelector(state => state.userReducer);
  useEffect(() => {
      if (localStorage.getItem("token")){
          dispatch(setLoading(true));
          UserApi.auth()
              .then(response => dispatch(setUser(response.data)))
              .then(() => dispatch(setLoading(false)));
      }
  }, []);
  return (
      <div className="app">
        <Routes>
          <Route path="/" element={userIsLoading ? <></> : isAuth ? <Home/> : <LogIn/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </div>
  );
}

export default App;
