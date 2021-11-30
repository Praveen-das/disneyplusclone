import './app.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'

import Home from './pages/Home'
import Movie from './pages/Movie';
import MovieTheater from './pages/MovieTheater';
import Results from './pages/Results';
import DisneyPlusPage from './pages/Disneyplus';
import ChannelsPage from './pages/ChannelsPage';
import LanguagesPage from './pages/LanguagesPage';
import GenresPage from './pages/GenresPage';
import MyAccountPage from './pages/MyAccountPage';
import GetStartedPage from './pages/GetStartedPage';
import WatchlistPage from './pages/WatchlistPage';
import { useFirebase } from './contexts/FirebaseContext';
import Searchbox from './Components/Searchbox/Searchbox';
import LoginPage from './pages/LoginPage';
import TV from './pages/TV';
import ComingSoon from './pages/ComingSoon';
import { useEffect } from 'react';

function App() {
  const { currentUser } = useFirebase()

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  })

  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/tv' component={TV} />
          <Route exact path='/movies' component={Movie} />
          <Route path='/movies/watch' component={MovieTheater} />
          <Route path='/movies/languages/:language' component={Results} />
          <Route path='/movies/search/:q' component={Results} />
          <Route path='/disneyplus' component={DisneyPlusPage} />
          <Route path='/channels/:q' component={ChannelsPage} />
          <Route exact path='/languages' component={LanguagesPage} />
          <Route path='/languages/:language' component={Results} />
          <Route exact path='/genres' component={GenresPage} />
          <Route exact path='/genres/:genres' component={Results} />
          <Route path='/get-started' component={GetStartedPage} />
          <Route path='/watchlist' component={WatchlistPage} />
          <Route path='/search' component={Searchbox} />
          <Route path='/sign-in' component={LoginPage} />
          <Route path={['/sports', '/kids']} component={ComingSoon} />
          {currentUser ?
            <Route path='/my-account' component={MyAccountPage} /> :
            <Redirect to='/' />
          }
        </Switch>
      </Router>
    </>
  );
}

export default App;
