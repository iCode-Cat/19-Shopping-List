import { useEffect, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './Redux/userSlice';
import './Global.css';
import Container from './Components/Container';
import { fetchItems } from './Redux/ItemsSlice';
import History from './Pages/History';
const Register = lazy(() => import('./Pages/Register'));
const Login = lazy(() => import('./Pages/Login'));
const Items = lazy(() => import('./Pages/Items'));
const SideMenu = lazy(() => import('../src/Components/SideMenu'));
const Cart = lazy(() => import('./Components/Cart'));

function App() {
  const dispatch = useDispatch();
  const State = useSelector((state) => state);
  const isAuthenticated = State.user.isAuthenticated;
  useEffect(() => {
    if (isAuthenticated) return;
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(fetchItems());
  }, [isAuthenticated]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        {isAuthenticated && <SideMenu Quantity={State.cart.list.length} />}
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/'>
            <Redirect to='/items' />
          </Route>
          <Container>
            <ProtectedRoute
              State={State}
              exact
              path='/items'
              component={Items}
            />
            <ProtectedRoute
              State={State}
              exact
              path='/history'
              component={History}
            />
          </Container>
        </Switch>
        {isAuthenticated && <Cart State={State} />}
      </Router>
    </Suspense>
  );
}

export default App;
