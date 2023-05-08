## E-commerce Website Documentation

This is the documentation for an e-commerce website built using Node.js, Express, MongoDB, and other related technologies. The website allows users to browse products, add them to the cart, checkout, and make payments. It also includes an admin dashboard for managing products, orders, and user accounts.
Table of Contents

    Installation
    Usage
    Project Structure
    Technologies Used
    Features
    Routes
    Models
    Controllers
    Views
    Middleware
    Conclusion

## Installation

To install the project, follow these steps:

    Clone the repository to your local machine.
    Install the required dependencies using npm install.
    Create a .env file in the root directory and add the necessary environment variables (see .env.example for reference).
    Start the server using npm start.

## Usage

To use the website, follow these steps:

    Browse the products on the home page.
    Click on a product to view its details.
    Add the product to the cart by clicking the "Add to Cart" button.
    View the cart by clicking the cart icon in the top right corner.
    Proceed to checkout by clicking the "Checkout" button.
    Fill out the shipping and payment information and click "Place Order".
    View the order confirmation page and wait for the order to be processed.

To use the admin dashboard, follow these steps:

    Log in as an admin using the login page.
    Manage products, orders, and user accounts using the dashboard.

## Project Structure

The project is structured as follows:


├── controllers
│   ├── auth.js
│   ├── orders.js
│   ├── products.js
│   └── shop.js
├── middleware
│   ├── is-auth.js
│   └── shop.js
├── models
│   ├── order.js
│   ├── product.js
│   └── user.js
├── public
│   ├── css
│   ├── images
│   └── js
├── routes
│   ├── admin.js
│   ├── auth.js
│   ├── index.js
│   ├── products.js
│   └── shop.js
├── views
│   ├── 404.ejs
│   ├── auth
│   ├── includes
│   ├── orders
│   ├── products
│   ├── shop
│   └── layouts.ejs
├── .env.example
├── app.js
├── package-lock.json
├── package.json
└── README.md

    controllers: Contains the controller functions for handling requests and responses.
    middleware: Contains the middleware functions for handling authentication and other tasks.
    models: Contains the Mongoose models for the database.
    public: Contains the static files (CSS, images, and JavaScript) for the website.
    routes: Contains the route handlers for the website.
    views: Contains the EJS templates for rendering the website.
    .env.example: Example environment variables file.
    app.js: Main application file.
    package-lock.json: Auto-generated file for package dependencies.
    package.json: Contains the project dependencies and scripts.
    README.md: Project documentation file.

## Technologies Used

The project uses the following technologies:

Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
Express: A fast, unopinionated, minimalist web framework for Node.js.
MongoDB: A document-based NoSQL database.
Mongoose: A MongoDB object modeling tool designed to work in an asynchronous environment.
EJS: A simple templating language that lets you generate HTML markup with plain JavaScript.
Stripe: A payment processing platform for online businesses.
Features
The website includes the following features:

User authentication and authorization.
Product browsing and searching.
Product details and reviews.
Product cart and checkout.
Order history and status tracking.
Admin dashboard for managing products, orders, and user accounts.

## Features:
The website offers a range of features, including:

    User authentication: Users can sign up for an account, log in, and reset their password if needed.
    Search functionality: Users can search for products using keywords and filters such as price range and category.
    Product listing: The website displays products in a grid format, with each product showing its name, image, price, and rating.
    Product details: Users can click on a product to see its full details, including a description, images, reviews, and related products.
    Shopping cart: Users can add products to their cart, view their cart, and edit or remove items from their cart before checking out.
    Checkout: The website uses Stripe for payment processing, allowing users to securely enter their payment information and complete their purchase.

## Routes:
The website has the following routes:

    /: The home page, which displays a selection of featured products.
    /login: The login page, where users can enter their credentials to log in.
    /register: The registration page, where users can create a new account.
    /products: The products page, which displays all products in a grid format.
    /products/:id: The product details page, which displays the details of a specific product.
    /cart: The cart page, where users can view and edit the items in their cart.
    /checkout: The checkout page, where users can enter their payment information and complete their purchase.

## Models:
The website has three main models: User, Product, and Order.

    User: This model stores information about the users of the website, including their name, email, password (hashed), and a list of orders they have placed.
    Product: This model stores information about the products available for purchase on the website, including their name, description, price, image, rating, and category.
    Order: This model stores information about the orders placed by users, including the user who placed the order, the items in the order (as an array of product IDs and quantities), the total price, and the date the order was placed.
    
## Controllers
The project includes the following controller functions:

auth.js
: Contains functions for handling user authentication and authorization.
orders.js
: Contains functions for handling orders, including creating, fetching, and updating orders.
products.js
: Contains functions for handling products, including creating, fetching, updating, and deleting products.
shop.js
: Contains functions for handling general shop-related tasks, including rendering the home page, product list page, product details page, cart page, checkout page, and order history page.
## Views
The project includes the following EJS templates:

404.ejs: Error page for handling 404 errors.
auth/: Contains templates for handling user authentication and authorization, including login and signup pages.
includes/: Contains reusable templates for rendering header, footer, and navigation elements.
orders/: Contains templates for rendering order-related pages, including order history and order details pages.
products/: Contains templates for rendering product-related pages, including product list, product details, and product editing pages.
shop/: Contains templates for rendering general shop-related pages, including the home page, cart page, and checkout page.
layouts.ejs: Main layout template for the website.

## Middleware
The project includes the following middleware functions:

is-auth.js: Middleware function for checking if a user is authenticated before allowing access to protected routes.
shop.js: Middleware function for handling general shop-related tasks, including adding products to cart, fetching cart items, and calculating cart totals.

## Conclusion
This documentation provides a comprehensive overview of the e-commerce website project built using Node.js, Express, MongoDB, and related technologies. It includes detailed instructions for installation and usage, a description of the project structure and technologies used, an overview of the website features and routes, and an explanation of the controllers, views, and middleware functions included in the project.
