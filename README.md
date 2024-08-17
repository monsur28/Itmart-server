ITMart Backend Server

This is the backend server for the ITMart e-commerce website. The server is built using Node.js, Express.js, and MongoDB. It provides RESTful API endpoints for managing products, user authentication, and other features necessary for the e-commerce functionality.

## Features

- **User Authentication**: 
  - JWT-based authentication.
  - Google authentication via Firebase.
  
- **Product Management**:
  - CRUD operations for products.
  - Filtering, searching, pagination, and sorting of products.

- **Cart Management**:
  - Add, remove, and update items in the user's cart.
  
- **Order Management**:
  - Place orders and manage order history.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM library for MongoDB.
- **JWT**: JSON Web Tokens for secure authentication.
- **Firebase**: Authentication for Google sign-in.
- **Swagger**: API documentation.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/itmart-backend.git
```
Navigate to the project directory:

```bash
cd itmart-backend
```
Install the dependencies:

```bash
npm install
```
Create a .env file in the root directory and add the following environment variables:

```bash
PORT=5000
MONGODB_URI=your-mongodb-uri
```
Start the development server:

```bash
npm run dev
```
API Documentation
The API is documented using Swagger. After starting the server, you can access the API documentation at:

```bash
http://localhost:5000/api-docs
```
Project Structure
plaintext
├── config/
├── .env                # Environment variables
├── .gitignore          # Ignored files and directories
├── app.js              # Main application entry point
└── index.js           # Server configuration

#Products
GET /api/products: Get all products with filtering, pagination, and sorting.
GET /api/products/:id: Get a single product by ID.
POST /api/products: Create a new product.
PUT /api/products/:id: Update a product by ID.
DELETE /api/products/:id: Delete a product by ID.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any inquiries or questions, please reach out to me at your-email@example.com.
