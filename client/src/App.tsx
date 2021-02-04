import { FC, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import LoginFrom from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Navigation from './components/Navigation';
import List from './components/List';
import ResetForm from './components/ResetForm';

import { materialTheme } from './config/theme';

const App: FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ThemeProvider theme={materialTheme}>
      <Container>
        <Router>
          <Navigation loggedIn={loggedIn} onLogout={() => setLoggedIn(false)} />
          <Switch>
            <Route path="/" exact>
              {!loggedIn ? (
                <LoginFrom onLogin={() => setLoggedIn(true)} />
              ) : (
                <List />
              )}
            </Route>
            <Route path="/signup" exact>
              <SignUpForm onSignUp={() => setLoggedIn(true)} />
            </Route>
            <Route path="/reset" exact>
              <ResetForm onReset={() => setLoggedIn(false)} />
            </Route>
            <Route>
              <h1>Not found</h1>
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
