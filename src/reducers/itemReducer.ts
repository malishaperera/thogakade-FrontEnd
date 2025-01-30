import { ItemModel } from "../models/ItemModel";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: ItemModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/item"
});

// Save Item
export const saveItem = createAsyncThunk(
    'item/saveItem',
    async (item: ItemModel) => {
        try {
            const response = await api.post('/add', item);
            return response.data;
        } catch (error) {
            console.log('Error:', error);
        }
    }
);

// Delete Item
export const deleteItem = createAsyncThunk(
    'item/deleteItem',
    async (id: number) => {
        try {
            const response = await api.delete(`/delete/${id}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

// Update Item
export const updateItem = createAsyncThunk(
    'item/updateItem',
    async (item: ItemModel) => {
        try {
            const response = await api.put(`/update/${item.id}`, item);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

// Get all Items
export const getAllItems = createAsyncThunk(
    'item/getItems',
    async () => {
        try {
            const response = await api.get('/view');
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ItemModel>) {
            state.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveItem.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveItem.rejected, (state, action) => {
                console.error("Failed to save item:", action.payload);
            })
            .addCase(saveItem.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(deleteItem.rejected, (state, action) => {
                console.error("Failed to delete item:", action.payload);
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                return state.filter((item: ItemModel) => item.id !== action.payload.id);
            })
            .addCase(deleteItem.pending, (state, action) => {
                console.log("Pending delete item", action.payload);
            });
        builder
            .addCase(updateItem.rejected, (state, action) => {
                console.error("Failed to update item:", action.payload);
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const item = state.find((item: ItemModel) => item.id === action.payload.id);
                if (item) {
                    item.name = action.payload.name;
                    item.description = action.payload.description;
                    item.price = action.payload.price;
                    item.qty = action.payload.qty;
                }
            })
            .addCase(updateItem.pending, (state, action) => {
                console.log("Pending update item:", action.payload);
            });
        builder
            .addCase(getAllItems.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getAllItems.pending, (state, action) => {
                console.log("Pending get items:", action.payload);
            })
            .addCase(getAllItems.rejected, (state, action) => {
                console.error("Failed to fetch items:", action.payload);
            });
    }
});

export default itemSlice.reducer;
