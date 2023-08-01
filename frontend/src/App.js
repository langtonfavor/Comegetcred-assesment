import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomModal from './Modal';

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
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center text-3xl font-bold mb-4">Item List</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="col mb-4"
            onClick={() => handleItemClick(item)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
  <CustomModal item={selectedItem} showModal={showModal} onClose={handleCloseModal} />
)}
    </div>
  );
}

export default App;
