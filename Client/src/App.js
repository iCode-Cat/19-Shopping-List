import { BrowserRouter as Router, Route } from 'react-router-dom';
import Test from './Pages/Test';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import ProtectedRoute from './Components/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { fetchUser } from './Redux/userSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = true;

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
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
