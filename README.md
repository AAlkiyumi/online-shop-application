# Online Shop Application

This project is an Online Shop Application built with Django, HTML, CSS and PostgreSQL, designed to facilitate e-commerce operations including product browsing, shopping cart management, and order processing.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Contributors](#contributors)

## Introduction

The Online Shop Application provides a platform for customers to browse products, add them to a shopping cart, and place orders. It also includes functionality for managing products, customer accounts, and inventory, accessible through a web interface.

## Features

- **Customer Features:**
  - Search and browse products
  - Add products to a shopping cart
  - Place orders
  - Manage credit cards and addresses
  - View order history

- **Staff Features:**
  - Add, delete, and modify products and prices
  - Manage product inventory across warehouses

## Setup

To run the project locally, follow these steps:

1. **Prerequisites:**
   - Python 3.x
   - Django
   - PostgreSQL

2. **Clone the repository:**
   ```bash
   git clone https://github.com/qme02/Online-Shopping-Application.git
   cd Online-Shopping-Application
   
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt

4. **Apply database migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate

5. **Create a superuser (for accessing Django Admin):**
   ```bash
   python manage.py createsuperuser

6. **Run the server:**
   ```bash
   python manage.py runserver

7. **Access the application:**
   
   Open a web browser and go to http://127.0.0.1:8000/

## Usage

Once the server is running and you've accessed http://127.0.0.1:8000/, you can:

- Log in as a customer or staff member.
- Browse products, add them to your cart, and place orders.
- Manage products, prices, and inventory (staff only).

## Contributors
- Almaamar Alkiyumi - Django Developer
- Jacob Towne - Web Developer
- Joe Ferguson - SQL Developer
- Zach Reising - Web Developer

