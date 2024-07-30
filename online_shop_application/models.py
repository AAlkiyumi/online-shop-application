1abc9b2bbe2dacf5b2ec6a5fb45fcff149505eb95bd610fe
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Address(models.Model):
    address_id = models.IntegerField(primary_key=True)
    street = models.CharField(max_length=20, blank=True, null=True)
    city = models.CharField(max_length=20, blank=True, null=True)
    state = models.CharField(max_length=2, blank=True, null=True)
    zipcode = models.CharField(max_length=5, blank=True, null=True)
    country = models.CharField(max_length=3, blank=True, null=True)
    type = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'address'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class CreditCard(models.Model):
    card_no = models.IntegerField(primary_key=True)  # The composite primary key (card_no, card_type, expiry_date) found, that is not supported. The first column is selected.
    card_type = models.CharField(max_length=15)
    expiry_date = models.CharField(max_length=7)
    address = models.ForeignKey(Address, models.DO_NOTHING, blank=True, null=True)
    cust = models.ForeignKey('Customer', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'credit_card'
        unique_together = (('card_no', 'card_type', 'expiry_date'),)


class Customer(models.Model):
    cust_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    email = models.CharField(max_length=30, blank=True, null=True)
    password = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customer'


class Custorder(models.Model):
    order_id = models.IntegerField(primary_key=True)
    order_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=10, blank=True, null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    card_no = models.ForeignKey(CreditCard.card_no, models.DO_NOTHING, db_column='card_no', blank=True, null=True)
    card_type = models.CharField(CreditCard.card_type, blank=True, null=True)
    expiry_date = models.CharField(CreditCard.expiry_date, blank=True, null=True)
    cust = models.ForeignKey(Customer, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'custorder'


class Deliveryplan(models.Model):
    dp_id = models.IntegerField(primary_key=True)  # The composite primary key (dp_id, order_id) found, that is not supported. The first column is selected.
    delivery_type = models.CharField(max_length=1, blank=True, null=True)
    delivery_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    delivery_date = models.DateField(blank=True, null=True)
    ship_date = models.DateField(blank=True, null=True)
    order = models.ForeignKey(Custorder, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'deliveryplan'
        unique_together = (('dp_id', 'order'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Orderitem(models.Model):
    prod = models.OneToOneField('Product', models.DO_NOTHING, primary_key=True)  # The composite primary key (prod_id, order_id) found, that is not supported. The first column is selected.
    quantity = models.IntegerField(blank=True, null=True)
    order = models.ForeignKey(Custorder, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'orderitem'
        unique_together = (('prod', 'order'),)


class Product(models.Model):
    prod_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    category = models.CharField(max_length=20, blank=True, null=True)
    brand = models.CharField(max_length=20, blank=True, null=True)
    size = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    size_unit = models.CharField(max_length=15, blank=True, null=True)
    description = models.CharField(max_length=300, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product'


class Staff(models.Model):
    staff_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    work_email = models.CharField(max_length=30, blank=True, null=True)
    password = models.CharField(max_length=20, blank=True, null=True)
    address = models.ForeignKey(Address, models.DO_NOTHING, blank=True, null=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    job_title = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'staff'


class Stock(models.Model):
    prod = models.OneToOneField(Product, models.DO_NOTHING, primary_key=True)  # The composite primary key (prod_id, warehouse_id) found, that is not supported. The first column is selected.
    warehouse = models.ForeignKey('Warehouse', models.DO_NOTHING)
    quantity = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stock'
        unique_together = (('prod', 'warehouse'),)


class Warehouse(models.Model):
    warehouse_id = models.IntegerField(primary_key=True)
    address = models.ForeignKey(Address, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'warehouse'
