import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
console.log(apiUrl);


interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Menu {
  menuId: string; 
  items: Item[];
}

interface MenuState {
  menus: Menu[];
  selectedMenuItems: { menuId: string; items: Item[] }[]; 
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menus: [],
  selectedMenuItems: [{ menuId: '', items: [] }], 
  loading: false,
  error: null,
};



export const addItem = createAsyncThunk(
  'menus/addItem',
  async (
    { menuId, name, description, price }: { menuId: string; name: string; description: string; price: number }
  ) => {
    // Pass menuId as part of the URL path
    const response = await axios.post(
      `${apiUrl}/api/items`, 
      { menuId, name, description, price } 
    );
    console.log({menuId, name, description, price});
    console.log(response.data);
    
    
    return response.data; 
  }
);



export const selectMenu = createAsyncThunk(
  'menus/selectMenu',
  async (menuId: string) => {
    try {
      
      const response = await axios.get(`${apiUrl}/api/items/${menuId}`);
      
      
      console.log('hi');
      
      console.log([{ 
        menuId, 
        items: response.data || [] 
      }]);
      
      return [{ 
        menuId, 
        items: response.data || [] 
      }];
    } catch (error) {
      
      throw new Error(error.response?.data?.message || 'Error fetching menu items');
    }
  }
);

export const fetchMenus = createAsyncThunk('menus/fetchMenus', async () => {
  const response = await axios.get(`${apiUrl}/api/menus`); 
  return response.data;
});

export const addMenu = createAsyncThunk('menus/addMenu', async (newMenu: any) => {
  const response = await axios.post(`${apiUrl}/api/menus`, newMenu); 
  return response.data;
});

export const fetchItems = createAsyncThunk('menus/fetchItems', async () => {
  const response = await axios.get('/api/items'); 
  return response.data;
});

// Slice
const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchMenus actions
    builder
  .addCase(fetchMenus.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchMenus.fulfilled, (state, action) => {
    state.loading = false;
    state.menus = action.payload;
  })
  .addCase(fetchMenus.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });
    // Handle addMenu actions
    builder
      .addCase(addMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menus.push(action.payload);
      })
      .addCase(addMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle fetchItems actions
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      builder
      .addCase(selectMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMenuItems = action.payload; 
      })
      .addCase(selectMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to select menu';
      });

      builder
  .addCase(addItem.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(addItem.fulfilled, (state, action) => {
    state.loading = false;

   
      state.selectedMenuItems[0].items.push(action.payload);
    
  })
  .addCase(addItem.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || 'Failed to add item';
  });

  },
});

export default menuSlice.reducer;
