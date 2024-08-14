import React from 'react';
import './JournalCollection.css';

const JournalCollection = ({ entries }) => {
  return (
    <div className="journal-collection">
      {entries.map((entry, index) => (
        <div key={index} className="journal-entry">
          <h2>Title: {entry.title}</h2>
          {entry.posterUrl && <img src={entry.posterUrl} alt={entry.title} className="poster-image" />}
          <h3>My Thoughts: {entry.content}</h3>
          {entry.rating !== null && <h3>Industry Score: {entry.rating}/10</h3>}
          <h3>My Score: {entry.userRating}/10</h3>
          {entry.releaseDate && <h3>Release Date: {new Date(entry.releaseDate).toLocaleDateString()}</h3>}
          <h3>Journal Entry Date: {entry.date.toLocaleString()}</h3>
        </div>
      ))}
    </div>
  );
};

export default JournalCollection;
