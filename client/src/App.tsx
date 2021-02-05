import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { gql, useQuery, useMutation } from '@apollo/client';

import LoginFrom from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Navigation from './components/Navigation';
import List from './components/List';
import ResetForm from './components/ResetForm';

import { selectLoggedIn, logIn } from './store/slice';
import { isLoggedInVar } from './cache';
import { materialTheme } from './config/theme';
import * as LoginTypes from './__generated__/Login';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const LOGIN_USER = gql`
  mutation Login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      success
      message
      token
    }
  }
`;

const App: FC = () => {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);
  const [login, { error }] = useMutation<
    LoginTypes.Login,
    LoginTypes.LoginVariables
  >(LOGIN_USER, {
    errorPolicy: 'all',
    onCompleted({ login }) {
      if (login?.success && login?.token) {
        localStorage.setItem('token', login.token);
        isLoggedInVar(true);
      }
    },
  });
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);
  const setLoggedIn = (isLoggedIn: boolean) =>
    dispatch(logIn({ loggedIn: isLoggedIn }));

  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <ThemeProvider theme={materialTheme}>
      <Container>
        <Router>
          <Navigation loggedIn={loggedIn} onLogout={() => setLoggedIn(false)} />
          <Switch>
            <Route path="/" exact>
              {!loggedIn ? <LoginFrom onLogin={login} /> : <List />}
              {error && <h5>Something went wrong</h5>}
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
