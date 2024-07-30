import React, { useState } from 'react';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../api/api';

const CreateAccount = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        balance: 0,
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Clear error if passwords match
        setError('');

        // Check if passwords match
        if (formData.password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Create a new customer
            await createCustomer(formData);

            // Reset form
            setFormData({
                name: '',
                balance: 0,
                email: '',
                password: ''
            });

            setConfirmPassword('');

            setSuccessMessage('Account created successfully!')

        } catch (error) {
            console.error('Failed to create account', error);
            setError('Failed to create account')
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    Confirm Password:
                    <input 
                        type="password" 
                        name="confirm-password" 
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange} 
                        required 
                    />
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <button type="submit">Create Account</button>
            </form>
            <a href="/"><button>Home</button></a>
        </div>
    );
};

export default CreateAccount;