import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [input, setInput] = useState('');
    const [vehicle, setVehicle] = useState([]);
    const [err, setErr] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post(`http://localhost:3000/api/car`, { input });
                if (res.data.message === 'Vehicle not found') {
                    setErr('Vehicle not found');
                    setVehicle('');
                } else {
                    setVehicle(res.data.data); // Assuming your API response contains the vehicle data
                    setErr('');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setErr('Something went wrong!');
            }
        };

        const timeoutId = setTimeout(fetchData, 500);

        return () => clearTimeout(timeoutId);
    }, [input]);

    const handleInputChange = event => {
        setInput(event.target.value);
    };

    return (
        <div>
            <label htmlFor='search'>Search:</label>
            <input
                type='text'
                name='search'
                id='search'
                value={input}
                onChange={handleInputChange}
                className='text-gray-700'
            />
            {err && <p>{err}</p>}
           
            {vehicle.map((item, index) => (
                <div key={index}>
                    <p className=' text-black'>{item.id}</p>
                    {/* Render other vehicle properties as needed */}
                </div>
            ))}
        </div>
    );
};  

export default Search;
