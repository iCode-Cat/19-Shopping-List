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
const Register = lazy(() => import('./Pages/Register'));
const Login = lazy(() => import('./Pages/Login'));
const Items = lazy(() => import('./Pages/Items'));
const SideMenu = lazy(() => import('../src/Components/SideMenu'));

function App() {
  const dispatch = useDispatch();
  const State = useSelector((state) => state);
  const isAuthenticated = State.user.isAuthenticated;
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        {isAuthenticated && <SideMenu />}
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
          </Container>
        </Switch>
        <Route path='*'>
          <Redirect to='/items' />
        </Route>
      </Router>
    </Suspense>
  );
}

export default App;
