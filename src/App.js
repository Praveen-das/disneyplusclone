import './app.css'
import AuthProvider from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Movie from './pages/Movie';
import MovieTheater from './pages/MovieTheater';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/movie' component={Movie} />
            <Route path='/watch' component={MovieTheater} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
