import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function IssueModal({ isOpen, onClose, issueId }) {
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    const fetchObject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/issues/${issueId}`);
        setIssue(response.data);
      } catch (error) {
        console.error('Error fetching object:', error);
      }
    };

    if (isOpen && issueId) {
      fetchObject();
    }
  }, [isOpen, issueId]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Issue Details</h2>
      {issue ? (
        <div>
          <p>ID: {issue._id}</p>
          <p>Title: {issue.title}</p>
          <p>Description: {issue.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}

export default IssueModal;