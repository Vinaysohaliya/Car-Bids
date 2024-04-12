import { useEffect, useState } from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useSelector } from 'react-redux';

const BiddingForm = ({ isOpen, onClose, vehicleId }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState(null);

  const vehicles = useSelector(state => state.vehicles.vehicles);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      setUserId(session?.user?.id);
    }
    fetchSession();
  }, []);

  const findAuctionId = (vehicleId) => {
    const vehicle = vehicles.find(vehicle => vehicle.id === vehicleId);
    if (vehicle && vehicle.auctionsdetails) {
      return vehicle.auctionsdetails.id;
    }
    return null;
  };

  const auctionId = findAuctionId(vehicleId);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/placebid', {
        vehicleId,
        bidAmount: parseFloat(bidAmount), // Parse the bid amount as a float
        bidderId: userId,
        auctionId
      });
      if (response.status === 200) {
        setSuccessMessage('Bid placed successfully');
      }
    } catch (error) {
      setError('Error placing bid: ' + error.response.data.error);
    }
  };

  const handleClose = () => {
    setBidAmount('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <h2>Place Bid</h2>
      <form onSubmit={handleBidSubmit}>
        <label htmlFor="bidAmount">Bid Amount:</label>
        <input type="text" id="bidAmount" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} className=' text-black' />
        <button type="submit">Place Bid</button>
      </form>
      <button onClick={handleClose}>Close</button>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default BiddingForm;
