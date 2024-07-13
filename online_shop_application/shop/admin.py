# shop/admin.py

from django.contrib import admin
from .models import Customer, Address, CreditCard, Staff, Product, Warehouse, Stock, CustOrder, OrderItem, DeliveryPlan

admin.site.register(Customer)
admin.site.register(Address)
admin.site.register(CreditCard)
admin.site.register(Staff)
admin.site.register(Product)
admin.site.register(Warehouse)
admin.site.register(Stock)
admin.site.register(CustOrder)
admin.site.register(OrderItem)
admin.site.register(DeliveryPlan)
