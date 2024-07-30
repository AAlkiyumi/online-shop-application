import React, { useState, useEffect } from 'react';
import { getAddresses, createAddress, updateAddress, deleteAddress, getWarehouses, createWarehouse, updateWarehouse, deleteWarehouse } from '../api/api';
import countries from './countries.json'; // Obtained from https://gist.github.com/bensquire/1ba2037079b69e38bb0d6aea4c4a0229

const WarehouseManagement = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [newWarehouse, setNewWarehouse] = useState({ address: '' });
  const [editWarehouse, setEditWarehouse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    type: 'W'
  });
  const [currentAddressId, setCurrentAddressId] = useState(null);

  useEffect(() => {
    fetchWarehouses();
    fetchAddresses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await getWarehouses();
      setWarehouses(response.data);
    } catch (error) {
      console.error('Failed to fetch warehouses', error);
    }
  };

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
        const response = await createAddress(formData);
        // setResponse(response.data.address_ID);
        await createWarehouse({ address: response.data.address_ID });
      }
      // Reset form and state
      setFormData({
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        type: 'W'
      });
      setIsEditing(false);
      setCurrentAddressId(null);
      fetchWarehouses();
      fetchAddresses();
    } catch (error) {
      console.error('Failed to save address', error);
    }
  };

  const handleEdit = (warehouse) => {
    const address = addresses.find(addr => addr.address_ID === warehouse.address);
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

  const handleDelete = async (warehouseId, addressId) => {
    try{
      await deleteWarehouse(warehouseId);
      await deleteAddress(addressId);
      fetchWarehouses(); // Refresh the list
      fetchAddresses();
    } catch (error) {
      console.error('Failed to delete warehouse', error);
    }
  };

  const getAddressById = (id) => {
    const address = addresses.find(addr => addr.address_ID === id);
    if (address) {
      return `${address.street}, ${address.city}, ${address.state}, ${address.zipcode}, ${address.country}`;
    }
    return 'Address not found';
  };

  return (
    <div>
      <h1>Warehouse Management</h1>
      <h2><a href='/'>Home</a></h2>
      <div>
        <h2>{isEditing ? 'Edit Warehouse' : 'Create New Warehouse'}</h2>
        <form onSubmit={handleSubmit}>
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
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>
          <div style={{display: 'flex', gap: '10px' }}>
            <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => { setIsEditing(false); setCurrentAddressId(null); setFormData({ street: '', city: '', state: '', zipcode: '', country: '', type: 'W' }); }}>Cancel</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Existing Warehouses</h2>
        <ul>
          {warehouses.map(warehouse => (
            <li key={warehouse.warehouse_ID}>
              <p>Address: {getAddressById(warehouse.address)}</p>
              <button onClick={() => handleEdit(warehouse)}>Edit</button>
              <button onClick={() => handleDelete(warehouse.warehouse_ID, warehouse.address)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WarehouseManagement;
