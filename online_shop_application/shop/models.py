from django.db import models

class Customer(models.Model):
    cust_ID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    email = models.EmailField(max_length=30)
    password = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Address(models.Model):
    ADDRESS_TYPE_CHOICES = [
        ('B', 'Billing'),
        ('S', 'Shipping'),
        ('W', 'Warehouse'),
    ]
    address_ID = models.AutoField(primary_key=True)
    street = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    state = models.CharField(max_length=2)
    zipcode = models.CharField(max_length=5)
    country = models.CharField(max_length=3)
    type = models.CharField(max_length=1, choices=ADDRESS_TYPE_CHOICES)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state}, {self.zipcode}, {self.country}"

class CreditCard(models.Model):
    card_no = models.BigIntegerField(primary_key=True, unique=True)
    card_type = models.CharField(max_length=15)
    expiry_date = models.CharField(max_length=7)
    address_ID = models.ForeignKey(Address, on_delete=models.CASCADE)
    cust_ID = models.ForeignKey(Customer, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('card_no', 'card_type', 'expiry_date')

    def __str__(self):
        return f"{self.card_type} ending in {str(self.card_no)[-4:]}"



class Staff(models.Model):
    staff_ID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    work_email = models.EmailField(max_length=30, default=1)
    password = models.CharField(max_length=2, default=10)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    job_title = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class Product(models.Model):
    prod_ID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    category = models.CharField(max_length=20)
    brand = models.CharField(max_length=20)
    size = models.DecimalField(max_digits=10, decimal_places=2)
    size_unit = models.CharField(max_length=15)
    description = models.TextField(max_length=300)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Warehouse(models.Model):
    warehouse_ID = models.AutoField(primary_key=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

    def __str__(self):
        return f"Warehouse {self.warehouse_ID}"

class Stock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    class Meta:
        unique_together = ('product', 'warehouse')

    def __str__(self):
        return f"Stock of {self.product} in Warehouse {self.warehouse}"

class CustOrder(models.Model):
    order_ID = models.AutoField(primary_key=True)
    order_date = models.DateField()
    status = models.CharField(max_length=30)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    credit_card = models.ForeignKey(CreditCard, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    def __str__(self):
        return f"Order {self.order_ID}"

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    order = models.ForeignKey(CustOrder, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('product', 'order')

    def __str__(self):
        return f"Item {self.product} in Order {self.order}"

class DeliveryPlan(models.Model):
    dp_ID = models.AutoField(primary_key=True)
    delivery_type = models.CharField(max_length=30)
    delivery_price = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_date = models.DateField()
    ship_date = models.DateField()
    order = models.ForeignKey(CustOrder, on_delete=models.CASCADE)

    def __str__(self):
        return f"Delivery Plan {self.dp_ID} for Order {self.order}"
