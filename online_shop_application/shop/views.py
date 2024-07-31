from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Customer, Address, CreditCard, Staff, Product, Warehouse, Stock, CustOrder, OrderItem, DeliveryPlan
from .serializers import CustomerSerializer, AddressSerializer, CreditCardSerializer, StaffSerializer, ProductSerializer, WarehouseSerializer, StockSerializer, CustOrderSerializer, OrderItemSerializer, DeliveryPlanSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

class CreditCardViewSet(viewsets.ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

class CustOrderViewSet(viewsets.ModelViewSet):
    queryset = CustOrder.objects.all()
    serializer_class = CustOrderSerializer

    def create(self, request, *args, **kwargs):
        order_data = request.data
        credit_card_id = order_data.pop('credit_card')
        customer_id = order_data.pop('customer')
        
        credit_card = CreditCard.objects.get(card_no=credit_card_id)
        customer = Customer.objects.get(cust_ID=customer_id)

        # Create order
        order = CustOrder.objects.create(**order_data, credit_card=credit_card, customer=customer)
        
        # Handle order items and update stock
        # for item in order_data['items']:
        #     OrderItem.objects.create(order=order, **item)
        #     product = Product.objects.get(prod_ID=item['product'])
        #     stock = Stock.objects.get(product=product, warehouse=order.warehouse)
        #     stock.quantity -= item['quantity']
        #     stock.save()

        # Update customer balance
        customer.balance -= order_data['total_price']
        customer.save()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

class DeliveryPlanViewSet(viewsets.ModelViewSet):
    queryset = DeliveryPlan.objects.all()
    serializer_class = DeliveryPlanSerializer
