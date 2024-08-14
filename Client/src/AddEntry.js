import React, { useState } from 'react';
import './AddEntry.css';
import JournalForm from './JournalForm';

const AddEntry = ({ onAddEntry }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddEntryClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
  };

  return (
    <div className="add-entry-container">
      {!showForm && (
        <div className="centered-button">
          <button className="add-entry-button-style" onClick={handleAddEntryClick}>
            Add Journal Entry
          </button>
        </div>
      )}
      {showForm && <JournalForm onAddEntry={onAddEntry} onCancel={handleCancel} onSubmitSuccess={handleFormSubmitSuccess} />}
    </div>
  );
};

export default AddEntry;
