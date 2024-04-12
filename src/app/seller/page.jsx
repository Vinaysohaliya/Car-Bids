"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Search from '../components/Search';

const SubmitVehicleForm = () => {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    description: '',
    name:''
  });

  const { data: session } = useSession();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!session) {
        throw new Error('User session not found');
      }

      const res = await axios.post('http://localhost:3000/api/addcar', {
        ...formData,
        userId: session.user.id,
      });

      console.log(res.data); // Assuming the response data contains something useful
      // Optionally, provide feedback to the user about successful submission
    } catch (error) {
      console.error('Error submitting form:', error.message);
      // Optionally, provide feedback to the user about the error
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md"
    >
    <Search/>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold">
        Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border text-gray-700 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="registrationNumber" className="block text-gray-700 font-semibold">
          Registration Number:
        </label>
        <input
          type="text"
          id="registrationNumber"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border text-gray-700 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-semibold">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 text-gray-700 p-2 w-full border rounded-md"
          rows="4"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default SubmitVehicleForm;
