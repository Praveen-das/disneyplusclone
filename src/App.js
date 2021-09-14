import './app.css'
import AuthProvider from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Movie from './pages/Movie';
import MovieTheater from './pages/MovieTheater';
import Results from './pages/Results';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/movies' component={Movie} />
            <Route path='/movies/watch' component={MovieTheater} />
            <Route path='/movies/languages' component={Results} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
