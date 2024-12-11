'use client'

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchMenus, selectMenu } from '../redux/slices/menuSlices';
import { RootState } from '../redux/store';
import Link from 'next/link';

const MenuList = () => {
  const dispatch = useAppDispatch();
  const { menus, loading, error, selectedMenuItems } = useAppSelector((state) => state.menus);

  useEffect(() => {
    dispatch(fetchMenus()).then((action) => {
      
      if (
        action.type === 'menus/fetchMenus/fulfilled' &&
        action.payload.length > 0 &&
        selectedMenuItems[0].menuId == '' 
      ) {
        const firstMenuId = action.payload[0].id;
        dispatch(selectMenu(firstMenuId));
      }
    });
  }, [dispatch]);


  console.log(menus);
  

  
  if (loading) {
    return <p>Loading menus...</p>;
  }

  if (error) {
    return <p>Error fetching menus: {error}</p>;
  }

  
  const handleMenuClick = (menuId: string) => {
    dispatch(selectMenu(menuId));
  };

  return (
    <div>
      <h2>MENU</h2>
      <div>
        {menus.length > 0 ? (
          menus.map((menu) => (
            <div key={menu.id}>
              <h3>{menu.name}</h3>
              <p>{menu.description}</p>
              <button onClick={() => handleMenuClick(menu.id)}>
                View Items
              </button>
            </div>
          ))
        ) : (
          <p>No menus available.</p>
        )}
      </div>
    </div>
  );
};

export default MenuList;
