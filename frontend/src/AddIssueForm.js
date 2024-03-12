import axios from 'axios';
import { useState, useEffect } from 'react';

function AddObjectForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/issues', {
        title,
        description,
      });
      onAdd(response.data); // Notify parent component that a new object has been added
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding object:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">Add new Issue</button>
    </form>
  );
}

export default AddObjectForm;