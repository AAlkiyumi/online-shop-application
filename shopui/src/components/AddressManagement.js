import React, { useState, useEffect } from 'react';
import { getAddresses, createAddress, updateAddress, deleteAddress } from '../api/api';
import countries from './countries.json' // Obtained from https://gist.github.com/bensquire/1ba2037079b69e38bb0d6aea4c4a0229

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    type: 'B' // Default to 'Billing'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getAddresses();
      setAddresses(response.data);
    } catch (error) {
      console.error('Failed to fetch addresses', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update the address
        await updateAddress(currentAddressId, formData);
      } else {
        // Create a new address
        await createAddress(formData);
      }
      // Reset form and state
      setFormData({
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        type: 'B'
      });
      setIsEditing(false);
      setCurrentAddressId(null);
      fetchAddresses(); // Refresh the list
    } catch (error) {
      console.error('Failed to save address', error);
    }
  };

  const handleEdit = (address) => {
    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      country: address.country,
      type: address.type
    });
    setIsEditing(true);
    setCurrentAddressId(address.address_ID);
  };

  const handleDelete = async (address_ID) => {
    try {
      await deleteAddress(address_ID);
      fetchAddresses(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete address', error);
    }
  };

  return (
    <div>
      <h1>Address Management</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>{isEditing ? 'Edit Address' : 'Add New Address'}</h2>
          <br/>
          <label>
            Street:
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Zipcode:
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Country:
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select a country</option>
              {countries.map(country => (
                <option value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Type:
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="B">Billing</option>
              <option value="S">Shipping</option>
            </select>
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => { setIsEditing(false); setCurrentAddressId(null); setFormData({ street: '', city: '', state: '', zipcode: '', country: '', type: 'B' }); }}>Cancel</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Address List</h2>
        <ul>
          {addresses.length > 0 ? (
            addresses.filter(address => address.type !== 'W').map(address => (
              <li key={address.address_ID}>
                <p>Street: {address.street}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>Zipcode: {address.zipcode}</p>
                <p>Country: {address.country}</p>
                <p>Type: {address.type === 'B' ? 'Billing' : 'Shipping'}</p>
                <button onClick={() => handleEdit(address)}>Edit</button>
                <button onClick={() => handleDelete(address.address_ID)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No addresses available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AddressManagement;