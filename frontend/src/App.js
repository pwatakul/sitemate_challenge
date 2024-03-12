import { useState, useEffect } from 'react';
import axios from 'axios';
import AddIssueForm from './AddIssueForm';
import IssueModal from './IssueModal';

export default function dashboard() {
  
  const [issues, setIssues] = useState([]);
  const [editIssue, setEditIssue] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  useEffect(() => {
    const fetchIssues= async () => {
      try {
        const response = await axios.get('http://localhost:3000/issues');
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching objects:', error);
      }
    };

    fetchIssues();

  }, []);

  const handleAddIssue = (newIssue) => {
    setIssues([...issues, newIssue]);
  };

  const handleDeleteIssue = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/issues/${id}`);
      setIssues(issues.filter(issue => issue._id !== id));
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  };

  const handleEdit = (issue) => {
    setEditIssue(issue);
    setEditedTitle(issue.title);
    setEditedDescription(issue.description);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/issues/${editIssue._id}`, {
        title: editedTitle,
        description: editedDescription,
      });
      setIssues(issues.map(issue => issue._id === editIssue._id ? {...issue, title: editedTitle, description: editedDescription } : issue));
      setEditIssue(null);
      setEditedTitle('');
      setEditedDescription('');
    } catch (error) {
      console.error('Error updating object:', error);
    }
  };

  const handleIssueClick = (id) => {
    setSelectedIssueId(id);
  };

  return (
    <div>
      <h1>Issue dashboard</h1>
      
      <AddIssueForm onAdd={handleAddIssue} />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => (
            <tr key={issue._id}>
              <td>{issue._id}</td>
              <td>{editIssue && editIssue._id === issue._id ? <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} /> : issue.title}</td>
              <td>{editIssue && editIssue._id === issue._id ? <textarea value={editedDescription} onChange={e => setEditedDescription(e.target.value)} /> : issue.description}</td>
              <td>
                {
                  editIssue && editIssue._id == issue._id ? (
                    <>
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={() => setEditIssue(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleIssueClick(issue._id)}>View</button>
                      <button onClick={() => handleEdit(issue)}>Edit</button>
                      <button onClick={() => handleDeleteIssue(issue._id)}>Delete</button>
                    </>
                  )
                }
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <IssueModal isOpen={selectedIssueId !== null} onClose={() => setSelectedIssueId(null)} issueId={selectedIssueId} />

  </div>
  );
}