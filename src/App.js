import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import PasswordPage from './components/PasswordPage'
import Upload from './components/UploadPage'
import Home from './components/Home'
import './App.css';


const App = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <>
      {isAuthenticated ?
        <div className="container">
          <Router>
            <nav className="nav">
              <div className="nav-brand">Shopify Image Repo</div>
              <ul className="nav-items">
                <li className="nav-item">
                  <Link to="/">Gallery</Link>
                </li>
                <li className="nav-item">
                  <Link to="/upload">Upload</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" onClick={logout}>Log Out</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/upload">
                <Upload />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </div>
        : <PasswordPage />}
    </>
  );
}

export default App;
