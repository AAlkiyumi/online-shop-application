from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'customers', views.CustomerViewSet)
router.register(r'addresses', views.AddressViewSet)
router.register(r'creditcards', views.CreditCardViewSet)
router.register(r'staff', views.StaffViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'warehouses', views.WarehouseViewSet)
router.register(r'stock', views.StockViewSet)
router.register(r'custorders', views.CustOrderViewSet)
router.register(r'orderitems', views.OrderItemViewSet)
router.register(r'deliveryplans', views.DeliveryPlanViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
