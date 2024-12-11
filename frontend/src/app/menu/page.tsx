'use client'
import { useState } from 'react';
import MenuList from '../components/MenuList';
import MenuForm from '../components/MenuForm';
import ItemList from '../components/ItemList';

export default function MenuPage() {

  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div>
      <h2>Menu</h2>
      <button onClick={toggleFormVisibility}>Add Menu</button>
      <MenuList />
      <ItemList/>


{isFormVisible && <MenuForm closeForm={toggleFormVisibility} />}

    </div>
  );
}
