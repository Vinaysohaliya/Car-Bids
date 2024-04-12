import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllVehicles = createAsyncThunk('vehicles/fetchAllVehicles', async () => {
  const response = await axios.get('http://localhost:3000/api/allvehicle');
  return response.data.allvehicle;
});

export const fetchVehicleAuctions = createAsyncThunk('vehicles/fetchVehicleAuctions', async (vehicleId) => {
  const response = await axios.post(`http://localhost:3000/api/checkauction`, { vehicleId });
  return { vehicleId, auctions: response.data };
});

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Reducer for fetchAllVehicles thunk
    builder.addCase(fetchAllVehicles.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAllVehicles.fulfilled, (state, action) => {
      state.status = 'idle';
      state.vehicles = action.payload;
    });
    builder.addCase(fetchAllVehicles.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });

    // Reducer for fetchVehicleAuctions thunk
    builder.addCase(fetchVehicleAuctions.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchVehicleAuctions.fulfilled, (state, action) => {
      state.status = 'idle';
      console.log(action.payload);
      const { vehicleId, auctions } = action.payload;
      const vehicleIndex = state.vehicles.findIndex(vehicle => vehicle.id === vehicleId);
      if (vehicleIndex !== -1) {
        state.vehicles[vehicleIndex].auctions = auctions.auctionFound;
        state.vehicles[vehicleIndex].auctionsdetails=auctions.auction;
      }
    });
    builder.addCase(fetchVehicleAuctions.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });
  },
});

export default vehiclesSlice.reducer;
