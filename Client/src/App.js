import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './Redux/userSlice';
import './Global.css';
const Test = lazy(() => import('./Pages/Test'));
const Register = lazy(() => import('./Pages/Register'));
const Login = lazy(() => import('./Pages/Login'));

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState.isAuthenticated;
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Switch>
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            exact
            path='/'
            component={Test}
          />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
