import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import PasswordPage from './components/PasswordPage'
import UploadPage from './components/UploadPage'
import HomePage from './components/HomePage'
import './App.css';


const App = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <>
      {isAuthenticated ?
        <div className="container">
          <Router>
            <nav className="nav">
              <div className="nav-brand">Cloud Image Storage</div>
              <ul className="nav-items">
                <li className="nav-item">
                  <Link to="/">Gallery</Link>
                </li>
                <li className="nav-item">
                  <Link to="/upload">Upload</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" onClick={() => logout()}>Log Out</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/upload">
                <UploadPage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </Router>
        </div>
        : <PasswordPage />}
    </>
  );
}

export default App;
