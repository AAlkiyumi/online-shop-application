import React, { useState, useEffect } from 'react';
import { getDeliveryPlans, createDeliveryPlan, updateDeliveryPlan, deleteDeliveryPlan } from '../api/api';

const DeliveryPlanManagement = () => {
  const [deliveryPlans, setDeliveryPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    delivery_type: '',
    delivery_price: '',
    delivery_date: '',
    ship_date: '',
    order_ID: ''
  });
  const [editPlan, setEditPlan] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDeliveryPlans();
  }, []);

  const fetchDeliveryPlans = async () => {
    try {
      const response = await getDeliveryPlans();
      setDeliveryPlans(response.data);
    } catch (error) {
      console.error('Failed to fetch delivery plans', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditPlan(prev => ({ ...prev, [name]: value }));
    } else {
      setNewPlan(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = async () => {
    try {
      await createDeliveryPlan(newPlan);
      fetchDeliveryPlans(); // Refresh the list
      setNewPlan({
        delivery_type: '',
        delivery_price: '',
        delivery_date: '',
        ship_date: '',
        order_ID: ''
      });
    } catch (error) {
      console.error('Failed to create delivery plan', error);
    }
  };

  const handleEdit = (plan) => {
    setEditPlan(plan);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await updateDeliveryPlan(editPlan.dp_ID, editPlan);
      fetchDeliveryPlans(); // Refresh the list
      setIsEditing(false);
      setEditPlan(null);
    } catch (error) {
      console.error('Failed to update delivery plan', error);
    }
  };

  const handleDelete = async (planId) => {
    try {
      await deleteDeliveryPlan(planId);
      fetchDeliveryPlans(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete delivery plan', error);
    }
  };

  return (
    <div>
      <h1>Delivery Plan Management</h1>
      <div>
        <h2>{isEditing ? 'Edit Delivery Plan' : 'Create New Delivery Plan'}</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          isEditing ? handleUpdate() : handleCreate();
        }}>
          <label>
            Delivery Type:
            <input type="text" name="delivery_type" value={isEditing ? editPlan.delivery_type : newPlan.delivery_type} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Delivery Price:
            <input type="number" name="delivery_price" value={isEditing ? editPlan.delivery_price : newPlan.delivery_price} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Delivery Date:
            <input type="date" name="delivery_date" value={isEditing ? editPlan.delivery_date : newPlan.delivery_date} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Ship Date:
            <input type="date" name="ship_date" value={isEditing ? editPlan.ship_date : newPlan.ship_date} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Order ID:
            <input type="number" name="order_ID" value={isEditing ? editPlan.order_ID : newPlan.order_ID} onChange={handleChange} required />
          </label>
          <br />
          <button type="submit">{isEditing ? 'Update Delivery Plan' : 'Create Delivery Plan'}</button>
        </form>
      </div>
      <div>
        <h2>Existing Delivery Plans</h2>
        <ul>
          {deliveryPlans.map(plan => (
            <li key={plan.dp_ID}>
              <p>Delivery Type: {plan.delivery_type}</p>
              <p>Delivery Price: ${plan.delivery_price}</p>
              <p>Delivery Date: {plan.delivery_date}</p>
              <p>Ship Date: {plan.ship_date}</p>
              <p>Order ID: {plan.order_ID}</p>
              <button onClick={() => handleEdit(plan)}>Edit</button>
              <button onClick={() => handleDelete(plan.dp_ID)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <a href="/"><button>Home</button></a>
    </div>
  );
};

export default DeliveryPlanManagement;