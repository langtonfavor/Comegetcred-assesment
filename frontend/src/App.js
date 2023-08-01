import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items'); // Proxy to our Node.js server
      setItems(response.data);
    } catch (error) {
      console.log('Failed to fetch items:', error);
    }
  };

  const handleItemClick = (item) => {
    if (item && item.id) {
      setSelectedItem(item);
      setShowModal(true);
      console.log("selectedItem:", selectedItem);
      console.log("showModal:", showModal);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center text-3xl font-bold mb-4">Item List</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {items.map((item) => (
          item && item.id ? (
            <div
              key={item.id}
              className="col"
              onClick={() => handleItemClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-text text-muted">{item.body}</p>
                </div>
              </div>
            </div>
          ) : null
        ))}
      </div>

      {selectedItem && showModal && (
  <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{selectedItem.title}</h5>
          <button type="button" className="close" onClick={handleCloseModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>{selectedItem.body}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default App;
