import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import AddEntry from './AddEntry';
import JournalCollection from './JournalCollection';
import Footer from './Footer';

const App = () => {
  const [entries, setEntries] = useState([]);

  const handleAddEntry = (entry) => {
    setEntries([entry, ...entries]);
  };

  return (
    <div className="App">
      <div className="anim_gradient"></div>
      <Header />
      <main className="main-content">
        <div className="centered-text">
          <h1><span className="animated-text">Your personal movie journal.</span></h1>
          <h2><span className="animated-text">Create a new entry to search for a film or TV show.</span></h2>
        </div>
        <AddEntry onAddEntry={handleAddEntry} />
        <JournalCollection entries={entries} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
