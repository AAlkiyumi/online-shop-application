from django.urls import path
from . import views

urlpatterns = [
    path('staff/', views.staff_dashboard, name='staff_dashboard'),
    path('staff/products/', views.manage_products, name='manage_products'),
    path('staff/warehouse/', views.add_stock, name='add_stock'),
    path('add_product/', views.add_stock, name='add_product'),
    path('delete_product/', views.add_stock, name='delete_product'),
    path('modify_product/', views.add_stock, name='modify_product'),

	# Home Page
	path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('', views.home, name='home'),

    # Customer URLs
    path('customers/', views.customer_list, name='customer_list'),
    path('customers/new/', views.create_customer, name='create_customer'),

    # Address URLs
    path('addresses/', views.address_list, name='address_list'),
    path('addresses/new/', views.create_address, name='create_address'),

    # Credit Card URLs
    path('credit_cards/', views.credit_card_list, name='credit_card_list'),
    path('credit_cards/new/', views.create_credit_card, name='create_credit_card'),

    # Staff URLs
    path('staff/', views.staff_list, name='staff_list'),
    path('staff/new/', views.create_staff, name='create_staff'),

    # Product URLs
    path('products/', views.product_list, name='product_list'),
    path('products/new/', views.create_product, name='create_product'),

    # Warehouse URLs
    path('warehouses/', views.warehouse_list, name='warehouse_list'),
    path('warehouses/new/', views.create_warehouse, name='create_warehouse'),

    # Stock URLs
    path('stocks/', views.stock_list, name='stock_list'),
    path('stocks/new/', views.create_stock, name='create_stock'),

    # Customer Order URLs
    path('orders/', views.cust_order_list, name='cust_order_list'),
    path('orders/new/', views.create_cust_order, name='create_cust_order'),

    # Order Item URLs
    path('order_items/', views.order_item_list, name='order_item_list'),
    path('order_items/new/', views.create_order_item, name='create_order_item'),

    # Delivery Plan URLs
    path('delivery_plans/', views.delivery_plan_list, name='delivery_plan_list'),
    path('delivery_plans/new/', views.create_delivery_plan, name='create_delivery_plan'),
    
]