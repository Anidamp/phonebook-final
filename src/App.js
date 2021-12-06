import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Authorization from './pages/Authorization';
import LoginForm from './components/AuthForm/Login';
import RegisterForm from './components/AuthForm/Register';
import HomePage from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import selectors from './redux/selectors';
import { useGetUserQuery } from './serviceApi/Api';
import { setUser } from './redux/slice';
import { Toaster } from 'react-hot-toast';
import { toastOptions } from './components/Notification/Notification';
import Navigate from './components/Navigate/Navigate';
import PublicRoutes from './components/Routes/PublicRoute';
import PrivateRoutes from './components/Routes/PrivateRoute';


export default function App () {
 const dispatch = useDispatch();
  const isAuth = useSelector(selectors.isLogin);
  const token = useSelector(selectors.getToken);
  const { data } = useGetUserQuery('', {
    skip: token === null || (token && isAuth),
  });

  useEffect(() => {
    if (isAuth) return;
    data && dispatch(setUser(data));
  }, [data, dispatch, isAuth]);

  return (
    <div className="app">
      <Toaster toastOptions={toastOptions} />
      <Navigate />
      <Routes>
        <Route
          path="/"
          element={<PublicRoutes isAuth={isAuth} component={Authorization} />}
        />
        <Route
          path="/login"
          element={<PublicRoutes isAuth={isAuth} component={LoginForm} />}
        />
        <Route
          path="/register"
          element={<PublicRoutes isAuth={isAuth} component={RegisterForm} />}
        />
        <Route
          path="/contacts"
          element={<PrivateRoutes isAuth={isAuth} component={HomePage} />}
        />
        <Route
          path="/"
          element={<PublicRoutes isAuth={isAuth} component={HomePage} />}
        />
      </Routes>
    </div>
  );
}



