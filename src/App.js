import './app.css'
import AuthProvider from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Movie from './pages/Movie';
import MovieTheater from './pages/MovieTheater';
import Languages from './pages/Languages';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/movies' component={Movie} />
            <Route path='/movies/watch' component={MovieTheater} />
            <Route path='/movies/languages/:language' component={Languages} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
