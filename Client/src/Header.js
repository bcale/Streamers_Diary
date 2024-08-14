// Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>
           the<br></br>streamer's <br></br>diary.
        </h1>
      </div>
     
      <div className="user-controls">
        <button>Login</button>
      </div>
    </header>
  );
};

export default Header;
