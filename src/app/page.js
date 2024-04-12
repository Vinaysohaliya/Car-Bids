'use client'
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVehicles, fetchVehicleAuctions } from './redux/vehicle';
import VehicleDetail from "./components/Vehicle";
import BiddingForm from "./components/BiddingForm";

export default function Home() {
  const dispatch = useDispatch();
  const { vehicles, error } = useSelector(state => state.vehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchAllVehicles());
  }, [dispatch]);

  // // Fetch auction status for selected vehicle when modal is opened
  // useEffect(() => {
  //   if (isModalOpen && selectedVehicleId) {
  //     dispatch(fetchVehicleAuctions(selectedVehicleId));
  //   }
  // }, [isModalOpen, selectedVehicleId, dispatch]);

  // // Check if vehicle is on auction
  // useEffect(() => {
  //   if (selectedVehicleId) {
  //     const vehicle = vehicles.find(vehicle => vehicle.id === selectedVehicleId);
  //     if (vehicle && vehicle.auctions.auctionFound ) {
  //       setIsVehicleOnAuction(true);
  //     } else {
  //       setIsVehicleOnAuction(false);
  //     }
  //   }
  // }, [selectedVehicleId, vehicles]);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap gap-4 mt-8">
        {error && <p className="text-red-500">{error}</p>}
        {vehicles && vehicles.map((vehicle, index) => (
          <div key={index} onClick={() => openModal(vehicle.id)}>
              <VehicleDetail
                name={vehicle.name}
                vehicleId={vehicle.id}
                description={vehicle.description}
                registrationNumber={vehicle.registrationNumber}
              />
          </div>
        ))}
      </div>
      {isModalOpen  && (
        <BiddingForm isOpen={isModalOpen} onClose={closeModal} vehicleId={selectedVehicleId} />
      )}
    </div>
  );
}
