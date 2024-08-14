import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './JournalForm.css';

const JournalForm = ({ onAddEntry, onSubmitSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // New state for selected movie details
  const suggestionsRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      title,
      content,
      userRating: rating,
      date: new Date(),
      posterUrl: selectedMovie ? `https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}` : null,
      rating: selectedMovie ? selectedMovie.vote_average : null,
      releaseDate: selectedMovie ? selectedMovie.release_date : null,
    };
    onAddEntry(newEntry);
    setTitle('');
    setContent('');
    setRating('');
    setSelectedMovie(null); // Reset selected movie
    onSubmitSuccess();
  };

  const handleTitleChange = async (e) => {
    setTitle(e.target.value);

    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: 'acfa76d1e46a053bd00010229eaeb990',
              query: e.target.value,
            },
          }
        );
        setSuggestions(response.data.results);
      } catch (error) {
        console.error('Error fetching movie suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleClickOutside = (e) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (movie) => {
    setTitle(movie.title);
    setSelectedMovie(movie); // Set selected movie details
    setSuggestions([]);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleRatingChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 10) {
      setRating(value);
    }
  };

  return (
    <div>
      <form className="journal-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list" ref={suggestionsRef}>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label htmlFor="content">My Thoughts:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="auto-resize-textarea"
          ></textarea>
        </div>
        <div>
        <label htmlFor="rating">My Rating (0-10):</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={handleRatingChange}
            min="0"
            max="10"
          />
        </div>
        <button type="submit">Submit Journal Entry</button>
      </form>
    </div>
  );
};

export default JournalForm;
