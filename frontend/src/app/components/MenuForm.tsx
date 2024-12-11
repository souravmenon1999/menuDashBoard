'use client'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMenu } from '../redux/slices/menuSlices';
import { RootState } from '../redux/store';

interface MenuFormProps {
  closeForm: () => void;
}

const MenuForm : React.FC<MenuFormProps> = ({ closeForm }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.menus); 

  const [menuName, setMenuName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!menuName.trim() || !menuDescription.trim()) {
      setFormError('Please fill in both fields');
      return;
    }

   
    dispatch(addMenu({ name: menuName, description: menuDescription }));

    
    setMenuName('');
    setMenuDescription('');
    setFormError('');
    closeForm();
  };

  return (
    <div className="modal">
      <div className="modal-content">
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="menuName">Menu Name:</label>
        <input
          id="menuName"
          type="text"
          placeholder="Menu Name"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          aria-describedby="menuNameError"
        />
      </div>

      <div>
        <label htmlFor="menuDescription">Menu Description:</label>
        <textarea
          id="menuDescription"
          placeholder="Menu Description"
          value={menuDescription}
          onChange={(e) => setMenuDescription(e.target.value)}
          aria-describedby="menuDescriptionError"
        />
      </div>

      {formError && <p id="formError" style={{ color: 'red' }}>{formError}</p>}
      {error && <p id="error" style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Menu'}
      </button>
    </form>
    <button onClick={closeForm}>Close</button>
      </div>
      <div className="modal-backdrop" onClick={closeForm}></div>
    </div>
  );
};

export default MenuForm;
