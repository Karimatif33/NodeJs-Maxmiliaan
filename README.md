# Dashboard

The Dashboard is a web application built with Node.js, Express, and MongoDB. It provides a user interface for managing products, orders, and users in an e-commerce application.

## Features

The Dashboard provides the following features:

- Authentication and authorization using JSON Web Tokens (JWT)
- CRUD operations for products, orders, and users
- Pagination and sorting for products and orders
- Filtering and searching for products
- File upload for product images
- Error handling and validation
- Unit and integration testing using Jest and Supertest

## Getting Started

To get started with the Dashboard, follow these steps:

1. Clone the repository:

git clone https://github.com/Karimatif33/NodeJsProjects.git



2. Navigate to the `Dashboard` directory:

cd NodeJsProjects/Dashboard


3. Install the dependencies:

npm install



4. Create a `.env` file and set the following environment variables:

PORT: The port number for the server (default is 3000)
MONGODB_URI: The URI for the MongoDB database
JWT_SECRET: The secret key for JWT authentication


5. Start the server:

npm start



The Dashboard will be available at `http://localhost:3000` (or the port number you specified in the `.env` file).

## Directory Structure

The Dashboard directory is organized as follows:

Dashboard/
├── controllers/
│ ├── orders.js
│ ├── products.js
│ └── users.js
├── models/
│ ├── order.js
│ ├── product.js
│ └── user.js
├── public/
│ ├── css/
│ ├── img/
│ └── js/
├── routes/
│ ├── auth.js
│ ├── orders.js
│ ├── products.js
│ └── users.js
├── views/
│ ├── includes/
│ ├── orders/
│ ├── products/
│ ├── users/
│ ├── error.hbs
│ ├── index.hbs
│ ├── layout.hbs
│ └── login.hbs
├── .env
├── app.js
├── package.json
└── README.md



The main components of the Dashboard are:

- `controllers/`: Contains the route handlers for the application
- `models/`: Contains the Mongoose models for the application
- `public/`: Contains static assets such as CSS, JavaScript, and images
- `routes/`: Contains the route definitions for the application
- `views/`: Contains the HTML templates for the application
- `.env`: Contains the environment variables for the application
- `app.js`: The main entry point for the application

## Authentication

The Dashboard uses JSON Web Tokens (JWT) for authentication and authorization. When a user logs in, a JWT token is generated and stored in the browser's local storage. This token is used to authenticate subsequent requests to protected endpoints.

### Login

The login page is located at `/login`. It contains a form where the user can enter their email and password to log in. When the form is submitted, the credentials are sent to the server for authentication. If the credentials are valid, a JWT token is generated and stored in the browser's local storage. The user is then redirected to the dashboard page.

### Logout

The logout button is located
