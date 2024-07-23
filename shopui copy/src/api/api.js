import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Staff API
export const getStaff = () => axios.get(`${API_URL}/staff/`);
export const createStaff = (staffData) => axios.post(`${API_URL}/staff/`, staffData);
export const updateStaff = (staffId, staffData) => axios.put(`${API_URL}/staff/${staffId}/`, staffData);
export const deleteStaff = (staffId) => axios.delete(`${API_URL}/staff/${staffId}/`);

// Customer API
export const getCustomers = () => axios.get(`${API_URL}/customers/`);
export const createCustomer = (customerData) => axios.post(`${API_URL}/customers/`, customerData);
export const updateCustomer = (customerId, customerData) => axios.put(`${API_URL}/customers/${customerId}/`, customerData);
export const deleteCustomer = (customerId) => axios.delete(`${API_URL}/customers/${customerId}/`);

// Address API
export const getAddresses = () => axios.get(`${API_URL}/addresses/`);
export const createAddress = (addressData) => axios.post(`${API_URL}/addresses/`, addressData);
export const updateAddress = (addressId, addressData) => axios.put(`${API_URL}/addresses/${addressId}/`, addressData);
export const deleteAddress = (addressId) => axios.delete(`${API_URL}/addresses/${addressId}/`);

// Credit Card API
export const getCreditCards = () => axios.get(`${API_URL}/creditcards/`);
export const createCreditCard = (creditCardData) => axios.post(`${API_URL}/creditcards/`, creditCardData);
export const updateCreditCard = (creditCardId, creditCardData) => axios.put(`${API_URL}/creditcards/${creditCardId}/`, creditCardData);
export const deleteCreditCard = (creditCardId) => axios.delete(`${API_URL}/creditcards/${creditCardId}/`);

// Product API
export const getProducts = () => axios.get(`${API_URL}/products/`);
export const createProduct = (productData) => axios.post(`${API_URL}/products/`, productData);
export const updateProduct = (productId, productData) => axios.put(`${API_URL}/products/${productId}/`, productData);
export const deleteProduct = (productId) => axios.delete(`${API_URL}/products/${productId}/`);

// Warehouse API
export const getWarehouses = () => axios.get(`${API_URL}/warehouses/`);
export const createWarehouse = (warehouseData) => axios.post(`${API_URL}/warehouses/`, warehouseData);
export const updateWarehouse = (warehouseId, warehouseData) => axios.put(`${API_URL}/warehouses/${warehouseId}/`, warehouseData);
export const deleteWarehouse = (warehouseId) => axios.delete(`${API_URL}/warehouses/${warehouseId}/`);

// Stock API
export const getStock = () => axios.get(`${API_URL}/stock/`);
export const createStock = (stockData) => axios.post(`${API_URL}/stock/`, stockData);
export const updateStock = (stockId, stockData) => axios.put(`${API_URL}/stock/${stockId}/`, stockData);
export const deleteStock = (stockId) => axios.delete(`${API_URL}/stock/${stockId}/`);

// Order API
export const getOrders = () => axios.get(`${API_URL}/custorders/`);
export const createOrder = (orderData) => axios.post(`${API_URL}/custorders/`, orderData);
export const updateOrder = (orderId, orderData) => axios.put(`${API_URL}/custorders/${orderId}/`, orderData);
export const deleteOrder = (orderId) => axios.delete(`${API_URL}/custorders/${orderId}/`);

// Order Item API
export const getOrderItems = () => axios.get(`${API_URL}/orderitems/`);
export const createOrderItem = (orderItemData) => axios.post(`${API_URL}/orderitems/`, orderItemData);
export const updateOrderItem = (orderItemId, orderItemData) => axios.put(`${API_URL}/orderitems/${orderItemId}/`, orderItemData);
export const deleteOrderItem = (orderItemId) => axios.delete(`${API_URL}/orderitems/${orderItemId}/`);

// Delivery Plan API
export const getDeliveryPlans = () => axios.get(`${API_URL}/deliveryplans/`);
export const createDeliveryPlan = (deliveryPlanData) => axios.post(`${API_URL}/deliveryplans/`, deliveryPlanData);
export const updateDeliveryPlan = (deliveryPlanId, deliveryPlanData) => axios.put(`${API_URL}/deliveryplans/${deliveryPlanId}/`, deliveryPlanData);
export const deleteDeliveryPlan = (deliveryPlanId) => axios.delete(`${API_URL}/deliveryplans/${deliveryPlanId}/`);