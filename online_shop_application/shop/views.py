from django.shortcuts import render, redirect, get_object_or_404
from .models import Product, Warehouse, Stock
from .forms import ProductForm, StockForm
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

def staff_dashboard(request):
    return render(request, 'staff_dashboard.html')

def manage_products(request):
    if request.method == 'POST':
        # Handle form submission for adding, deleting, or modifying products
        # Example:
        product_form = ProductForm(request.POST)
        if product_form.is_valid():
            # Process the form data and save to database
            product_form.save()
            return redirect('manage_products')  # Redirect after successful POST
    else:
        product_form = ProductForm()  # Create a new form instance

    return render(request, 'manage_products.html', {'product_form': product_form})

def edit_product(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    if request.method == 'POST':
        form = ProductForm(request.POST, instance=product)
        if form.is_valid():
            form.save()
            return redirect('manage_products')
    else:
        form = ProductForm(instance=product)
    return render(request, 'edit_product.html', {'form': form, 'product': product})

def delete_product(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    product.delete()
    return redirect('manage_products')

def add_stock(request):
    if request.method == 'POST':
        # Handle form submission for adding stock to warehouse
        # Example:
        stock_form = StockForm(request.POST)
        if stock_form.is_valid():
            # Process the form data and save to database
            stock_form.save()
            return redirect('add_stock')  # Redirect after successful POST
    else:
        stock_form = StockForm()  # Create a new form instance

    return render(request, 'add_stock.html', {'stock_form': stock_form})
    
    
    
















from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from .models import *
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


def register_user(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')  # Replace 'home' with your actual home page URL name
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})

def login_user(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')  # Replace 'home' with your actual home page URL name
    else:
        form = AuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})

def logout_user(request):
    logout(request)
    return redirect('login')  # Redirect to login page after logout

def home(request):
    return render(request, 'index.html')

def create_customer(request):
    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            form.save()
        else:
            print("Form is not valid:", form.errors)
            return redirect('customer_list')
    else:
        form = CustomerForm()
    return render(request, 'customer_form.html', {'form': form})

def customer_list(request):
    customers = Customer.objects.all()
    return render(request, 'customer_list.html', {'customers': customers})

def create_address(request):
    if request.method == 'POST':
        form = AddressForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('address_list')
    else:
        form = AddressForm()
    return render(request, 'address_form.html', {'form': form})

def address_list(request):
    addresses = Address.objects.all()
    return render(request, 'address_list.html', {'addresses': addresses})

def create_credit_card(request):
    if request.method == 'POST':
        form = CreditCardForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('credit_card_list')
    else:
        form = CreditCardForm()
    return render(request, 'credit_card_form.html', {'form': form})

def credit_card_list(request):
    credit_cards = CreditCard.objects.all()
    return render(request, 'credit_card_list.html', {'credit_cards': credit_cards})

def create_staff(request):
    if request.method == 'POST':
        form = StaffForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('staff_list')
    else:
        form = StaffForm()
    return render(request, 'staff_form.html', {'form': form})

def staff_list(request):
    staff_members = Staff.objects.all()
    return render(request, 'staff_list.html', {'staff_members': staff_members})

def create_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        form = ProductForm()
    return render(request, 'product_form.html', {'form': form})

def product_list(request):
    products = Product.objects.all()
    return render(request, 'product_list.html', {'products': products})

def create_warehouse(request):
    if request.method == 'POST':
        form = WarehouseForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('warehouse_list')
    else:
        form = WarehouseForm()
    return render(request, 'warehouse_form.html', {'form': form})

def warehouse_list(request):
    warehouses = Warehouse.objects.all()
    return render(request, 'warehouse_list.html', {'warehouses': warehouses})

def create_stock(request):
    if request.method == 'POST':
        form = StockForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('stock_list')
    else:
        form = StockForm()
    return render(request, 'stock_form.html', {'form': form})

def stock_list(request):
    stocks = Stock.objects.all()
    return render(request, 'stock_list.html', {'stocks': stocks})

def create_cust_order(request):
    if request.method == 'POST':
        form = CustOrderForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('cust_order_list')
    else:
        form = CustOrderForm()
    return render(request, 'cust_order_form.html', {'form': form})

def cust_order_list(request):
    cust_orders = CustOrder.objects.all()
    return render(request, 'cust_order_list.html', {'cust_orders': cust_orders})

def create_order_item(request):
    if request.method == 'POST':
        form = OrderItemForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('order_item_list')
    else:
        form = OrderItemForm()
    return render(request, 'order_item_form.html', {'form': form})

def order_item_list(request):
    order_items = OrderItem.objects.all()
    return render(request, 'order_item_list.html', {'order_items': order_items})

def create_delivery_plan(request):
    if request.method == 'POST':
        form = DeliveryPlanForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('delivery_plan_list')
    else:
        form = DeliveryPlanForm()
    return render(request, 'delivery_plan_form.html', {'form': form})

def delivery_plan_list(request):
    delivery_plans = DeliveryPlan.objects.all()
    return render(request, 'delivery_plan_list.html', {'delivery_plans': delivery_plans})
    
def product_list(request):
    products = Product.objects.all()
    return render(request, 'product_list.html', {'products': products})


def product_detail(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    return render(request, 'product_detail.html', {'product': product})


def view_cart(request):
    cart, created = ShoppingCart.objects.get_or_create(user=request.user)
    return render(request, 'cart.html', {'cart': cart})


def add_to_cart(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    cart, created = ShoppingCart.objects.get_or_create(user=request.user)
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += 1
    cart_item.save()
    return redirect('view_cart')


def remove_from_cart(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    cart = get_object_or_404(ShoppingCart, user=request.user)
    cart_item = get_object_or_404(CartItem, cart=cart, product=product)
    cart_item.delete()
    return redirect('view_cart')


def update_cart_quantity(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    cart = get_object_or_404(ShoppingCart, user=request.user)
    cart_item = get_object_or_404(CartItem, cart=cart, product=product)
    if 'quantity' in request.POST:
        cart_item.quantity = int(request.POST['quantity'])
        cart_item.save()
    return redirect('view_cart')


def place_order(request):
    cart = get_object_or_404(ShoppingCart, user=request.user)
    order = Order.objects.create(customer=request.user, total=0)
    total_cost = 0
    for item in cart.cartitem_set.all():
        OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity)
        total_cost += item.product.price * item.quantity
    order.total = total_cost
    order.save()
    cart.cartitem_set.all().delete()
    return redirect('product_list')


def manage_credit_cards(request):
    credit_cards = CreditCard.objects.filter(customer=request.user)
    return render(request, 'manage_credit_cards.html', {'credit_cards': credit_cards})


def add_credit_card(request):
    if request.method == 'POST':
        form = CreditCardForm(request.POST)
        if form.is_valid():
            credit_card = form.save(commit=False)
            credit_card.customer = request.user
            credit_card.save()
            return redirect('manage_credit_cards')
    else:
        form = CreditCardForm()
    return render(request, 'credit_card_form.html', {'form': form})


def delete_credit_card(request, card_id):
    credit_card = get_object_or_404(CreditCard, pk=card_id)
    credit_card.delete()
    return redirect('manage_credit_cards')


def manage_addresses(request):
    addresses = Address.objects.filter(customer=request.user)
    return render(request, 'manage_addresses.html', {'addresses': addresses})


def add_address(request):
    if request.method == 'POST':
        form = AddressForm(request.POST)
        if form.is_valid():
            address = form.save(commit=False)
            address.customer = request.user
            address.save()
            return redirect('manage_addresses')
    else:
        form = AddressForm()
    return render(request, 'address_form.html', {'form': form})


def delete_address(request, address_id):
    address = get_object_or_404(Address, pk=address_id)
    address.delete()
    return redirect('manage_addresses')

# Staff Views

def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('manage_products')
    else:
        form = ProductForm()
    return render(request, 'manage_products.html', {'form': form})


def edit_product(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    if request.method == 'POST':
        form = ProductForm(request.POST, instance=product)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        form = ProductForm(instance=product)
    return render(request, 'product_form.html', {'form': form})


def delete_product(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    product.delete()
    return redirect('product_list')


def add_stock(request):
    # Implement logic to add stock to warehouse
    pass



