import { FC, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container';

import { materialTheme } from './config/theme'

const App: FC = () => {
  const [loggedIn] = useState(false);

  return (
    <ThemeProvider theme={materialTheme}>
      <Container>
        <Router>
          <Switch>
            <Route path="/" exact>
              <h1>main page</h1>
            </Route>
            <Route path="/login" exact>
              <h1>Login</h1>
            </Route>
            <Route path='/signup' exact>
              <h1>sign up</h1>
            </Route>
            {loggedIn && (
              <Route path='/profile' exact>
                <h1>Profile</h1>
              </Route>
            )}
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
