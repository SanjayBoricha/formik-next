import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import UserContext from '../components/UserContext';
import '../style/bootstrap.min.css';

export default class MyApp extends App {
  state = {
    user: null
  };

  componentDidMount = () => {
    console.log(Router.router.pathname);

    const user = localStorage.getItem('coolapp-user');
    if (user) {
      this.setState({
        user
      });

      Router.push('/');
    } else {
      console.log(Router.router.pathname !== '/signup');
      if (Router.router.pathname !== '/signup') {
        Router.push('/signin');
      }
    }
  };

  signIn = (username, password) => {
    localStorage.setItem('coolapp-user', username);

    this.setState(
      {
        user: username
      },
      () => {
        Router.push('/');
      }
    );
  };

  signOut = () => {
    localStorage.removeItem('coolapp-user');
    this.setState({
      user: null
    });
    Router.push('/signin');
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          signIn: this.signIn,
          signOut: this.signOut
        }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}
