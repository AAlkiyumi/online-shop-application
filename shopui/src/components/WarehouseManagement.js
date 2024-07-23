import React, { useState, useEffect } from 'react';
import { getWarehouses, createWarehouse, updateWarehouse, deleteWarehouse } from '../api/api';

const WarehouseManagement = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [newWarehouse, setNewWarehouse] = useState({ address: '' });
  const [editWarehouse, setEditWarehouse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await getWarehouses();
      setWarehouses(response.data);
    } catch (error) {
      console.error('Failed to fetch warehouses', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditWarehouse(prev => ({ ...prev, [name]: value }));
    } else {
      setNewWarehouse(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = async () => {
    try {
      await createWarehouse(newWarehouse);
      fetchWarehouses(); // Refresh the list
      setNewWarehouse({ address: '' });
    } catch (error) {
      console.error('Failed to create warehouse', error);
    }
  };

  const handleEdit = (warehouse) => {
    setEditWarehouse(warehouse);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await updateWarehouse(editWarehouse.warehouse_ID, editWarehouse);
      fetchWarehouses(); // Refresh the list
      setIsEditing(false);
      setEditWarehouse(null);
    } catch (error) {
      console.error('Failed to update warehouse', error);
    }
  };

  const handleDelete = async (warehouseId) => {
    try {
      await deleteWarehouse(warehouseId);
      fetchWarehouses(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete warehouse', error);
    }
  };

  return (
    <div>
      <h1>Warehouse Management</h1>
      <div>
        <h2>{isEditing ? 'Edit Warehouse' : 'Create New Warehouse'}</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          isEditing ? handleUpdate() : handleCreate();
        }}>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={isEditing ? editWarehouse.address : newWarehouse.address}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">{isEditing ? 'Update Warehouse' : 'Create Warehouse'}</button>
        </form>
      </div>
      <div>
        <h2>Existing Warehouses</h2>
        <ul>
          {warehouses.map(warehouse => (
            <li key={warehouse.warehouse_ID}>
              <p>Address: {warehouse.address}</p>
              <button onClick={() => handleEdit(warehouse)}>Edit</button>
              <button onClick={() => handleDelete(warehouse.warehouse_ID)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WarehouseManagement;