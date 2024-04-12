"use client"
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VehicleDetail from '../components/Vehicle';

const Page = () => {
    const [user, setUser] = useState({});
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            if (session) {
                setUser(session.user);
            }
        };

        fetchSession();
    }, []);

    useEffect(() => {
        async function getVehicles() {
            if (user?.id) {
                try {
                    const res = await axios.post('http://localhost:3000/api/allvehicle', { id: user.id });
                    setVehicles(res.data.allvehicle);
                    console.log(res);
                } catch (error) {
                    console.error('Error fetching vehicles:', error);
                }
            }
        }
        getVehicles();
    }, [user]);

    const handleAddToAuction = async (vehicleId) => {
        const res = await axios.post('http://localhost:3000/api/add-to-auction', { vehicleId })
        console.log(res);
        console.log('Add vehicle to auction:', vehicleId);

    };

    return (
        <div>
            {user.role === 'SELLER' ? (
                <div>
                    <p>User Role: {user.name}</p>
                    {vehicles.map((vehicle, index) => (
                        <>
                            <VehicleDetail
                                key={index}
                                vehicleId={vehicle.id}
                                registrationNumber={vehicle.registrationNumber}
                                name={vehicle.name}
                                description={vehicle.description}
                            />
                            <button className='bg-green-600 p-2 rounded' onClick={() => handleAddToAuction(vehicle.id)}>Add to Auction</button>
                        </>


                    ))}
                </div>
            ) : (
                <div>Not a seller</div>
            )}
        </div>
    );
};

export default Page;
