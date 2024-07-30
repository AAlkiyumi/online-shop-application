import React, { useState, useEffect } from 'react';
import { getCreditCards, createCreditCard, updateCreditCard, deleteCreditCard } from '../api/api';

const CreditCardManagement = () => {
  const [creditCards, setCreditCards] = useState([]);
  const [formData, setFormData] = useState({
    card_no: '',
    card_type: '',
    expiry_date: '',
    address_ID: '',
    cust_ID: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);

  useEffect(() => {
    fetchCreditCards();
  }, []);

  const fetchCreditCards = async () => {
    try {
      const response = await getCreditCards();
      setCreditCards(response.data);
    } catch (error) {
      console.error('Failed to fetch credit cards', error);
    }
  };

  const formatExpiryDate = (value) => {
    // Remove all non-digit characters
    const cleanedValue = value.replace(/\D/g, '');

    // Format MM/YY
    if (cleanedValue.length >= 3) {
      return cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2, 4);
    }

    return cleanedValue;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'expiry_date') {
      const formattedValue = formatExpiryDate(value);
      setFormData(prevData => ({ ...prevData, [name]: formattedValue }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update the credit card
        await updateCreditCard(currentCardId, formData);
      } else {
        // Create a new credit card
        await createCreditCard(formData);
      }
      // Reset form and state
      setFormData({
        card_no: '',
        card_type: '',
        expiry_date: '',
        address_ID: '',
        cust_ID: ''
      });
      setIsEditing(false);
      setCurrentCardId(null);
      fetchCreditCards(); // Refresh the list
    } catch (error) {
      console.error('Failed to save credit card', error);
    }
  };

  const handleEdit = (creditCard) => {
    setFormData({
      card_no: creditCard.card_no,
      card_type: creditCard.card_type,
      expiry_date: creditCard.expiry_date,
      address_ID: creditCard.address_ID,
      cust_ID: creditCard.cust_ID
    });
    setIsEditing(true);
    setCurrentCardId(creditCard.card_no);
  };

  const handleDelete = async (card_no) => {
    try {
      await deleteCreditCard(card_no);
      fetchCreditCards(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete credit card', error);
    }
  };

  return (
    <div>
      <h1>Credit Card Management</h1>
      <form onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Edit Credit Card' : 'Add New Credit Card'}</h2>
        <label>
          Card Number:
          <input
            type="text"
            name="card_no"
            value={formData.card_no}
            onChange={handleChange}
            required
            disabled={isEditing} // Disable when editing
          />
        </label>
        <label>
          Card Type:
          <input
            type="text"
            name="card_type"
            value={formData.card_type}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="text"
            name="expiry_date"
            placeholder="MM/YY"
            value={formData.expiry_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address ID:
          <input
            type="text"
            name="address_ID"
            value={formData.address_ID}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Customer ID:
          <input
            type="text"
            name="cust_ID"
            value={formData.cust_ID}
            onChange={handleChange}
            required
          />
        </label>
        <div style={{ display: 'flex', gap: '10px'}}>
          <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
          <button type="button" onClick={() => { setIsEditing(false); setCurrentCardId(null); setFormData({ card_no: '', card_type: '', expiry_date: '', address_ID: '', cust_ID: '' }); }}>Cancel</button>
        </div>
      </form>
      <h2>Credit Card List</h2>
      <ul>
        {creditCards.length > 0 ? (
          creditCards.map(card => (
            <li key={card.card_no}>
              <p>Card No: {card.card_no}</p>
              <p>Type: {card.card_type}</p>
              <p>Expiry Date: {card.expiry_date}</p>
              <p>Address ID: {card.address_ID}</p>
              <p>Customer ID: {card.cust_ID}</p>
              <button onClick={() => handleEdit(card)}>Edit</button>
              <button onClick={() => handleDelete(card.card_no)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No credit cards available.</p>
        )}
      </ul>
    </div>
  );
};

export default CreditCardManagement;