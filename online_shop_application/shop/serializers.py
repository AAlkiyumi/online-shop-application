from rest_framework import serializers
from .models import Customer, Address, CreditCard, Staff, Product, Warehouse, Stock, CustOrder, OrderItem, DeliveryPlan

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['cust_ID', 'name', 'balance', 'email', 'password']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['address_ID', 'street', 'city', 'state', 'zipcode', 'country', 'type']

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ['card_no', 'card_type', 'expiry_date', 'address_ID', 'cust_ID']

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['staff_ID', 'name', 'work_email', 'password', 'address', 'salary', 'job_title']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['prod_ID', 'name', 'category', 'brand', 'size', 'size_unit', 'description', 'price']

class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ['warehouse_ID', 'address']

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['id', 'product', 'warehouse', 'quantity']

class CustOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustOrder
        fields = ['order_ID', 'order_date', 'status', 'total_price', 'credit_card', 'customer']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'order']

class DeliveryPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryPlan
        fields = ['dp_ID', 'delivery_type', 'delivery_price', 'delivery_date', 'ship_date', 'order']
