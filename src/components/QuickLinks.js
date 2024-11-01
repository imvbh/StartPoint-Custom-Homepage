import React, { useState, useEffect } from 'react';
import './QuickLinks.css';
import { BiEdit, BiSolidTrashAlt } from "react-icons/bi";

const QuickLinks = () => {
  const [links, setLinks] = useState(() => {
    const savedLinks = localStorage.getItem('quickLinks');
    return savedLinks ? JSON.parse(savedLinks) : [];
  });
  const [newLink, setNewLink] = useState({ name: '', url: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAddingLink, setIsAddingLink] = useState(false);

  useEffect(() => {
    localStorage.setItem('quickLinks', JSON.stringify(links));
  }, [links]);

  const handleAddLink = () => {
    if (newLink.name && newLink.url) {
      setLinks([...links, newLink]);
      setNewLink({ name: '', url: '' });
      setIsAddingLink(false);
    }
  };

  const handleDeleteLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleEditLink = (index) => {
    setEditingIndex(index);
    setNewLink(links[index]);
    setIsAddingLink(true);
  };

  const handleUpdateLink = () => {
    const updatedLinks = [...links];
    updatedLinks[editingIndex] = newLink;
    setLinks(updatedLinks);
    setNewLink({ name: '', url: '' });
    setEditingIndex(null);
    setIsAddingLink(false);
  };

  const handleLinkClick = (e, url) => {
    e.preventDefault(); // Prevent the default link action

    const linkElement = e.currentTarget; // Capture the reference to `currentTarget`
    linkElement.classList.add('clicked'); // Add the animation class
  
    // Open the link in a new tab after a delay
    setTimeout(() => {
      window.open(url, '_blank'); // Open the URL in a new tab
      linkElement.classList.remove('clicked'); // Clean up the animation class
    }, 1000); // Adjust this duration to match your animation timing
  };
  
  return (
    <section className="quick-links">
      <div className="links-container">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
            onClick={(e) => handleLinkClick(e, link.url)}
          >
            <div className="card-info">
              <img
                src={`https://www.google.com/s2/favicons?sz=32&domain=${link.url}`}
                alt={`${link.name} logo`}
                className="favicon"
              />
              <div className="link-details">
                <strong>{link.name}</strong>
              </div>
              <div className="link-actions">
                <button
                  className="edit-button"
                  onClick={(e) => { 
                    e.stopPropagation(); // Stop the click event from propagating to the link
                    handleEditLink(index); 
                  }}
                >
                  <BiEdit />
                </button>
                <button
                  className="delete-button"
                  onClick={(e) => { 
                    e.stopPropagation(); // Stop the click event from propagating to the link
                    handleDeleteLink(index); 
                  }}
                >
                  <BiSolidTrashAlt />
                </button>
              </div>
            </div>
          </a>
        ))}
        <button className="add-link-button" onClick={() => setIsAddingLink(!isAddingLink)}>
          {isAddingLink ? '-' : '+'}
        </button>
      </div>
  
      {isAddingLink && (
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
