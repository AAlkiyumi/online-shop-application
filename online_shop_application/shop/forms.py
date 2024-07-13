from django import forms
from .models import Customer, Address, CreditCard, Staff, Product, Warehouse, Stock, CustOrder, OrderItem, DeliveryPlan

class CustomerForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['cust_ID','name', 'balance']

class AddressForm(forms.ModelForm):
    class Meta:
        model = Address
        fields = ['street', 'city', 'state', 'zipcode', 'country', 'type']

class CreditCardForm(forms.ModelForm):
    class Meta:
        model = CreditCard
        fields = ['card_no', 'card_type', 'expiry_date', 'address', 'customer']

class StaffForm(forms.ModelForm):
    class Meta:
        model = Staff
        fields = ['name', 'address', 'salary', 'job_title']

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'brand', 'size', 'size_unit', 'description', 'price']

class WarehouseForm(forms.ModelForm):
    class Meta:
        model = Warehouse
        fields = ['address']

class StockForm(forms.ModelForm):
    class Meta:
        model = Stock
        fields = ['product', 'warehouse', 'quantity']

class CustOrderForm(forms.ModelForm):
    class Meta:
        model = CustOrder
        fields = ['order_date', 'status', 'total_price', 'card_no', 'card_type', 'expiry_date', 'customer']

class OrderItemForm(forms.ModelForm):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'order']

class DeliveryPlanForm(forms.ModelForm):
    class Meta:
        model = DeliveryPlan
        fields = ['delivery_type', 'delivery_price', 'delivery_date', 'ship_date', 'order']
