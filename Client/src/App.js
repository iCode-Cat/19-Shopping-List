import { BrowserRouter as Router, Route } from 'react-router-dom';
import Test from './Pages/Test';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProtectedRoute from './Components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './Redux/userSlice';
import { useEffect } from 'react';
import './Global.css';

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState.isAuthenticated;
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <Router>
      <ProtectedRoute
        isAuthenticated={isAuthenticated}
        exact
        path='/'
        component={Test}
      />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </Router>
  );
}

export default App;
