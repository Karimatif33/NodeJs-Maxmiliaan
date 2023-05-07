I apologize for the confusion earlier. Here is a detailed documentation for the Dashboard project:

## Dashboard
The Dashboard is a web application built with Node.js, Express, and MongoDB. It provides a user interface for managing products, orders, and users in an e-commerce application.

## Features
The Dashboard provides the following features:

Authentication and authorization using JSON Web Tokens (JWT)
CRUD operations for products, orders, and users
Pagination and sorting for products and orders
Filtering and searching for products
File upload for product images
Error handling and validation
Unit and integration testing using Jest and Supertest
Getting Started
To get started with the Dashboard, follow these steps:

Clone the repository: 
git clone https://github.com/Karimatif33/NodeJsProjects.git
Navigate to the 
Dashboard
 directory: 
cd NodeJsProjects/Dashboard
Install the dependencies: 
npm install
Create a 
.env
 file and set the following environment variables:
PORT: The port number for the server (default is 3000)
MONGODB_URI: The URI for the MongoDB database
JWT_SECRET: The secret key for JWT authentication
Start the server: 
npm startThe Dashboard will be available at http://localhost:3000(or the port number you specified in the .envfile).

##Directory Structure
The Dashboard directory is organized as follows:

Copy codeDashboard/
├── controllers/
│   ├── orders.js
│   ├── products.js
│   └── users.js
├── models/
│   ├── order.js
│   ├── product.js
│   └── user.js
├── public/
│   ├── css/
│   ├── img/
│   └── js/
├── routes/
│   ├── auth.js
│   ├── orders.js
│   ├── products.js
│   └── users.js
├── views/
│   ├── includes/
│   ├── orders/
│   ├── products/
│   ├── users/
│   ├── error.hbs
│   ├── index.hbs
│   ├── layout.hbs
│   └── login.hbs
├── .env
├── app.js
├── package.json
└── README.md
The main components of the Dashboard are:

controllers/: Contains the route handlers for the application
models/: Contains the Mongoose models for the application
public/: Contains static assets such as CSS, JavaScript, and images
routes/: Contains the route definitions for the application
views/: Contains the HTML templates for the application
.env: Contains the environment variables for the application
app.js: The main entry point for the application
Authentication
The Dashboard uses JSON Web Tokens (JWT) for authentication and authorization. When a user logs in, a JWT token is generated and stored in the browser's local storage. This token is used to authenticate subsequent requests to protected endpoints.

Login
The login page is located at 
/login
. It contains a form where the user can enter their email and password to log in. When the form is submitted, the credentials are sent to the server for authentication. If the credentials are valid, a JWT token is generated and stored in the browser's local storage. The user is then redirected to the dashboard page.

Logout
The logout button is located in the navigation bar. When the user clicks the logout button, the JWT token is removed from the browser's local storage. The user is then redirected to the login page.

Products
The products page is located at 
/products
. It displays a list of all products in the database. The user can perform the following actions on the products:

View Product Details
To view the details of a product, click on the product name or image. This will take you to the product details page, which displays all the information about the product.

Add Product
To add a new product, click on the "Add Product" button. This will take you to the add product page, where you can enter all the details about the product. Once you have entered all the details, click on the "Save" button to save the product to the database.

Edit Product
To edit an existing product, click on the "Edit" button next to the product. This will take you to the edit product page, where you can edit all the details about the product. Once you have made the changes, click on the "Save" button to save the changes to the database.

Delete Product
To delete an existing product, click on the "Delete" button next to the product. This will delete the product from the database.

Search and Filter Products
The products page includes a search bar and filter options. You can search for products by name or filter them by category

