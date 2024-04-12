'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicleAuctions } from '../redux/vehicle.js'; // Update the path to your vehiclesSlice file

const VehicleDetail = ({ registrationNumber, description, name, vehicleId }) => {
  const [onAuction, setOnAuction] = useState(false);
  const dispatch = useDispatch();

  // Fetch auction status using Redux Toolkit thunk
  useEffect(() => {
    const fetchAuctionStatus = async () => {
      try {
        await dispatch(fetchVehicleAuctions(vehicleId));
      } catch (error) {
        console.error('Error fetching auction status:', error);
        setOnAuction(false);
      }
    };

    fetchAuctionStatus();
  }, [dispatch, vehicleId]);

  // Access auction status from Redux store
  const auctions = useSelector((state) => state.vehicles.vehicles.find((vehicle) => vehicle.id === vehicleId)?.auctions);

  // Update onAuction state based on auction status
  useEffect(() => {
    setOnAuction(!!auctions);
  }, [auctions]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:w-80 md:w-96 lg:w-96 xl:w-96">
      <div className="vehicle-header mb-4">
        <h2 className="text-xl text-black font-bold">{name}</h2>
        <p className="text-gray-600">Registration Number: {registrationNumber}</p>
        {onAuction ? (
          <p className="text-green-600 font-bold">On Auction</p>
        ) : (
          <p className="text-gray-600">Not on Auction</p>
        )}
      </div>
      <div className="vehicle-description">
        <p className="text-gray-700 mb-2">Description: {description}</p>
      </div>
    </div>
  );
};

export default VehicleDetail;
