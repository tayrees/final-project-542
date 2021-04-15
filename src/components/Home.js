import React from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import Header from './Header';
import { Redirect } from 'react-router-dom';

const Home = (props) => {
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const clientId = "10d28d34e4674d8c9169555ab2f93a99";
  const redirectUri = "http://localhost:3000/redirect";
  const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
  ];
  const handleLogin = () => {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
  };
  const { isValidSession, location } = props;
  const { state } = location;
  const sessionExpired = state && state.session_expired;
  return (
    <React.Fragment>
      {isValidSession() ? (
        <Redirect to="/dashboard" />
      ) : (
          <div className="login">
            <Header />
            {sessionExpired && (
              <Alert variant="info">
                Session expired. Please Login!
          </Alert>
            )}
            <Button variant="info" type="submit" onClick={handleLogin}>
              Login to spotify
      </Button>
          </div>
        )}
    </React.Fragment>
  );
};
export default connect()(Home);