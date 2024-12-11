'use client'

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { RootState } from '../redux/store';
import { fetchItems, addItem } from '../redux/slices/menuSlices';

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
}

const ItemList = () => {
  const dispatch = useAppDispatch();

  const selectedMenuId = useAppSelector((state: RootState) => state.menus.selectedMenuId);
  const selectedMenuItems = useAppSelector((state: RootState) => state.menus.selectedMenuItems);
  const loading = useAppSelector((state: RootState) => state.menus.loading);
  const error = useAppSelector((state: RootState) => state.menus.error);

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle modal visibility

  useEffect(() => {
    if (selectedMenuId && !selectedMenuItems.length) {
      dispatch(fetchItems(selectedMenuId));
    }
  }, [selectedMenuId, selectedMenuItems, dispatch]);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newItemData = {
      menuId: selectedMenuItems[0].menuId,
      ...newItem,
    };

    try {
      await dispatch(addItem(newItemData));
      setNewItem({ name: '', description: '', price: 0 });
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false); // Close the modal after submission
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const data = selectedMenuItems[0]?.items || [];

  const openModal = () => setIsModalOpen(true); // Open the modal
  const closeModal = () => setIsModalOpen(false); // Close the modal

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (error) {
    return <p>Error fetching items: {error}</p>;
  }

  return (
    <div>
      <h3>Items</h3>
      <div>
        {data.length > 0 ? (
          data.map((item: Item) => (
            <div key={item.id}>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p>${item.price}</p>
            </div>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>

       
      <button onClick={openModal}>Add Item</button>

     
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>Add New Item</h4>
            <form onSubmit={handleAddItem}>
              <div>
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleChange}
                  placeholder="Item Name"
                  required
                />
              </div>
              <div>
                <textarea
                  name="description"
                  value={newItem.description}
                  onChange={handleChange}
                  placeholder="Item Description"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  name="price"
                  value={newItem.price}
                  onChange={handleChange}
                  placeholder="Price"
                  required
                  min="0"
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Item'}
              </button>
            </form>
            <button onClick={closeModal}>Close</button>
          </div>
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
