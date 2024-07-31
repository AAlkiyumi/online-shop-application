import React, { useState, useEffect } from 'react';
import { getDeliveryPlans, updateDeliveryPlan } from '../api/api';

const DeliveryPlanManagement = () => {
  const [deliveryPlans, setDeliveryPlans] = useState([]);
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
    setEditPlan(prev => ({ ...prev, [name]: value }));
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

  return (
    <div>
      <h1>Delivery Plan Management</h1>
      {isEditing && (
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}>
            <h2>Edit Delivery Plan</h2>
            <br/>
            <label>
              Order ID:
              <input
                type="text"
                name="order_ID"
                value={editPlan.order}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Delivery Type:
              <input 
                type="text" 
                name="delivery_type" 
                value={editPlan.delivery_type} 
                onChange={handleChange} 
                required 
              />
            </label>
            <br />
            <label>
              Delivery Price:
              <input 
                type="number" 
                name="delivery_price" 
                value={editPlan.delivery_price} 
                onChange={handleChange} 
                required 
              />
            </label>
            <br />
            <label>
              Delivery Date:
              <input 
                type="date" 
                name="delivery_date" 
                value={editPlan.delivery_date} 
                onChange={handleChange} 
                required 
              />
            </label>
            <br />
            <label>
              Ship Date:
              <input 
                type="date" 
                name="ship_date" 
                value={editPlan.ship_date} 
                onChange={handleChange} 
                required 
              />
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit">Update Delivery Plan</button>
              <button type="button" onClick={() => { setIsEditing(false); setEditPlan(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div>
        <h2>Existing Delivery Plans</h2>
        <ul>
          {deliveryPlans.map(plan => (
            <li key={plan.dp_ID}>
              <p>Delivery Type: {plan.delivery_type}</p>
              <p>Delivery Price: ${plan.delivery_price}</p>
              <p>Delivery Date: {plan.delivery_date}</p>
              <p>Ship Date: {plan.ship_date}</p>
              <p>Order ID: {plan.order}</p>
              <button onClick={() => handleEdit(plan)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeliveryPlanManagement;
