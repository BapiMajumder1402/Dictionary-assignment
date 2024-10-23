# Dictionary Assignment

This is a MERN stack project that allows users to search for words, add their meanings, and view all added words in a paginated table format. The application leverages React with Vite for the frontend and Node.js with Express and MongoDB for the backend.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for words with debounce functionality (600ms delay)
- Add new words and their meanings
- View all words in a paginated table
- RESTful API to manage words

## Technologies

- **Frontend:**
  - React with Vite
  - Redux Toolkit (RTK Query)

- **Backend:**
  - Node.js
  - Express
  - MongoDB (using MongoDB Atlas)

- **Other:**
  - CORS for handling cross-origin requests

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB Atlas account (for database)

### Clone the Repository

bash
git clone https://github.com/BapiMajumder1402/Dictionary-assignment.git
cd Dictionary-assignment

Backend Setup
Navigate to the server directory:

cd server
Install the dependencies:

npm install
Create a .env file in the server directory with the following content:

PORT=8000
MONGO_DB=mongodb+srv://<username>:<password>@mern.wdzrj.mongodb.net
CORS=*
Replace <username> and <password> with your MongoDB credentials.

Start the server:

npm run dev


Frontend Setup
Navigate to the client directory:

cd ../client
Install the dependencies:

npm install
Create a .env file in the client directory with the following content:

VITE_API_URL="http://localhost:8000/api/v1"
Start the React application:

npm run dev
API Endpoints
GET /api/v1/words: Retrieve all words (with pagination)
POST /api/v1/words: Add a new word and its meaning
GET /api/v1/words/search: Search for words based on input
Usage
Once both the frontend and backend are running, navigate to http://localhost:5173 (or your configured Vite port) in your web browser to access the application. You can add words, search for existing ones, and view the list in a paginated format.

## Key Features

- **Word Management:** 
  - Users can easily add new words and their meanings to the dictionary.
  
- **Search Functionality:** 
  - Implemented a search feature that allows users to quickly find words. The search input uses a debounce mechanism with a 600ms delay to optimize performance by reducing the number of API calls during rapid input.

- **Dynamic Pagination:** 
  - A paginated table displays all added words, making it easy for users to navigate through large datasets without overwhelming them.

- **RESTful API Integration:** 
  - The backend provides RESTful API endpoints for managing words, allowing for easy expansion and integration with other services.

- **State Management:** 
  - Utilizes Redux Toolkit (RTK Query) for efficient state management, caching data, and handling API calls, ensuring smooth performance and reduced loading times.

## Optimizations

- **Debounce Implementation:**
  - The debounce feature for the search input helps to limit the number of API calls, improving response time and reducing server load during user typing.

- **Caching with RTK Query:**
  - Leveraged RTK Query for caching data, which minimizes redundant API calls and speeds up data retrieval for previously fetched words.

- **Efficient Pagination Logic:**
  - Implemented server-side pagination to load only a subset of data at a time, which enhances performance and reduces the initial load time of the application.

- **Asynchronous Data Fetching:**
  - Used asynchronous functions for API calls, ensuring that the UI remains responsive while waiting for data from the server.

- **Error Handling:**
  - Comprehensive error handling in API calls to provide users with meaningful feedback and prevent application crashes.

- **Environment Configuration:**
  - Used environment variables to manage configuration settings, ensuring a clean separation of development and production settings.

- **Optimized Build:**
  - The Vite build process optimizes assets and bundles the application for production, reducing load times and improving performance.

- **Code Splitting:**
  - Implemented code splitting in React to load only the necessary components for the current view, further enhancing performance and user experience.

These features and optimizations contribute to a robust, user-friendly dictionary application that provides quick, efficient access to word management and searching capabilities.

