import React, { useState, useEffect } from 'react';
import './QuickLinks.css';

const QuickLinks = () => {
  const [links, setLinks] = useState(() => {
    // Load links from localStorage or return an empty array if none exist
    const savedLinks = localStorage.getItem('quickLinks');
    return savedLinks ? JSON.parse(savedLinks) : [];
  });
  const [newLink, setNewLink] = useState({ name: '', url: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAddingLink, setIsAddingLink] = useState(false); // New state for showing/hiding input fields

  useEffect(() => {
    // Save links to localStorage whenever they change
    localStorage.setItem('quickLinks', JSON.stringify(links));
  }, [links]);

  const handleAddLink = () => {
    if (newLink.name && newLink.url) {
      setLinks([...links, newLink]);
      setNewLink({ name: '', url: '' });
      setIsAddingLink(false); // Hide the input fields after adding
    }
  };

  const handleDeleteLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleEditLink = (index) => {
    setEditingIndex(index);
    setNewLink(links[index]);
    setIsAddingLink(true); // Show input fields when editing
  };

  const handleUpdateLink = () => {
    const updatedLinks = [...links];
    updatedLinks[editingIndex] = newLink;
    setLinks(updatedLinks);
    setNewLink({ name: '', url: '' });
    setEditingIndex(null);
    setIsAddingLink(false); // Hide the input fields after updating
  };

  return (
    <section className="quick-links">
      <div className="links-container">
        {links.map((link, index) => (
          <div key={index} className="link-card">
            <div className='card-info'>
            <img
              src={`https://www.google.com/s2/favicons?sz=32&domain=${link.url}`}
              alt={`${link.name} logo`}
              className="favicon"
            />
            <div className="link-details">
              <strong>{link.name}</strong>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.url}
              </a>
            </div>
            <div className="link-actions">
              <button onClick={() => handleEditLink(index)}>Edit</button>
              <button onClick={() => handleDeleteLink(index)}>Delete</button>
            </div>
          </div></div>
        ))}
        <button className="add-link-button" onClick={() => setIsAddingLink(!isAddingLink)}>
          {isAddingLink ? '-' : '+'} {/* Toggle button label */}
        </button>
      </div>

      {isAddingLink && ( // Conditionally render the input fields
        <div className="add-link">
          <input
            type="text"
            placeholder="Name"
            value={newLink.name}
            onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          />
          {editingIndex !== null ? (
            <button onClick={handleUpdateLink}>Update Link</button>
          ) : (
            <button onClick={handleAddLink}>Add Link</button>
          )}
        </div>
      )}
    </section>
  );
};

export default QuickLinks;
