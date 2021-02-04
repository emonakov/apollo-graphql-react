import { FC } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';

const Nav = styled.nav`
  padding: ${({ theme }) => theme.paddingMd} 0;
`;

interface NavigationProps {
  loggedIn: boolean;
  onLogout: () => void;
}

const Navigation: FC<NavigationProps> = ({ loggedIn, onLogout }) => {
  return (
    <Nav>
      {!loggedIn && (
        <GridList cellHeight={40} cols={8}>
          <Button to="/" exact component={NavLink}>
            Home
          </Button>
          <Button to="/signup" exact component={NavLink}>
            Sign Up
          </Button>
        </GridList>
      )}
      {loggedIn && (
        <GridList cellHeight={40} cols={8}>
          <Button to="/" exact component={NavLink}>
            List
          </Button>
          <Button onClick={onLogout}>Log out</Button>
        </GridList>
      )}
    </Nav>
  );
};

export default Navigation;
