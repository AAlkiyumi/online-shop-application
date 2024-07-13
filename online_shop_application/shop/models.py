from django.db import models

class Customer(models.Model):
    cust_ID = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)
    balance = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Address(models.Model):
    address_ID = models.IntegerField(primary_key=True)
    street = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    state = models.CharField(max_length=2)
    zipcode = models.CharField(max_length=5)
    country = models.CharField(max_length=3)
    type = models.CharField(max_length=1)

class CreditCard(models.Model):
    card_no = models.IntegerField(primary_key=True)
    card_type = models.CharField(max_length=15)
    expiry_date = models.CharField(max_length=7)
    address_ID = models.IntegerField()
    cust_ID = models.IntegerField()

    class Meta:
        unique_together = ('card_no', 'card_type', 'expiry_date')
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

class Staff(models.Model):
    staff_ID = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)
    address_ID = models.IntegerField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    job_title = models.CharField(max_length=30)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

class Product(models.Model):
    prod_ID = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)
    category = models.CharField(max_length=20)
    brand = models.CharField(max_length=20)
    size = models.DecimalField(max_digits=10, decimal_places=2)
    size_unit = models.CharField(max_length=15)
    description = models.CharField(max_length=300)
    price = models.DecimalField(max_digits=10, decimal_places=2)

class Warehouse(models.Model):
    warehouse_ID = models.IntegerField(primary_key=True)
    address_ID = models.IntegerField()
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

class Stock(models.Model):
    prod_ID = models.IntegerField()
    warehouse_ID = models.IntegerField()
    quantity = models.IntegerField()

    class Meta:
        unique_together = ('prod_ID', 'warehouse_ID')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)

class CustOrder(models.Model):
    order_ID = models.IntegerField(primary_key=True)
    order_date = models.DateField()
    status = models.CharField(max_length=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    card_no = models.IntegerField()
    card_type = models.CharField(max_length=15)
    expiry_date = models.CharField(max_length=7)
    cust_ID = models.IntegerField()

    class Meta:
        unique_together = ('order_ID', 'card_no', 'card_type', 'expiry_date')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    credit_card = models.ForeignKey(CreditCard, on_delete=models.CASCADE)

class OrderItem(models.Model):
    prod_ID = models.IntegerField()
    quantity = models.IntegerField()
    order = models.ForeignKey(CustOrder, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('prod_ID', 'order')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

class DeliveryPlan(models.Model):
    dp_ID = models.IntegerField(primary_key=True)
    delivery_type = models.CharField(max_length=1)
    delivery_price = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_date = models.DateField()
    ship_date = models.DateField()
    #order_id = models.IntegerField()

    class Meta:
        unique_together = ('dp_ID', 'order_id')
    
    def __str__(self):
        return f"DeliveryPlan {self.dp_ID} for Order {self.order_id}"

    # Define foreign key relationship if necessary
    order = models.ForeignKey(CustOrder, on_delete=models.CASCADE)