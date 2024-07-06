# Task Manager
A task manager "to-do list" app, built with React using Typescript and hosted on Supabase via PostgreSQL 

## Project Structure:
### backend/

`config/`:
-   Files configure the connection to the Supabase database using keys from the .env file (not shared publicly)
-   One file for admin key, one for regular client key

`models/userModel.js`:
-   Functions to retrieve data from database tables and storage 
-   Intermediary between database and controllers

`controllers/`:
-   Resolve HTTP requests from the routes -> retrieve data from database via models -> send back HTTP response to the frontend
-   Intermediary between models and routes

`routes/`:
-   Receive HTTP requests from the frontend and forward request to appropriate controller

`middleware/authenticate.js`:
-   Ensure a user is authenticated before accessing any routes via their access/refresh token

`migrations/`:
-   Simple PostgreSQL schema of the database, including table and functions
-   (RLS policies implemented but not shown here)

### frontend/src/

`index.tsx`:
-   Renders app component into the DOM
-   Wrapped by AuthProvider to consistently store user session and details

`App.css`:
-   CSS styles for all components in the app

`App.tsx`:
-   Main app component, ensuring authorisation via refresh token mechanism when it expires
-   Defines main UI parts and sections

`api/`:
-   Frontend functions to interact with backend API routes

`context/AuthContext.tsx`:
-   Custom useAuth hook and AuthProvider which encompasses the whole app

`components/`:
-   Components that make up the app
-   Split into Authentication (components for log in, sign up, profile detail changes etc.) and tasks (components for CRUD operations on tasks)


## Demo:
### Live Demo:
https://guyneh.github.io/maths-test/

### Run locally:
1.  Clone the repository in your terminal:
    -   git clone https://github.com/guyneh/maths-test.git

2. Navigate to the project directory:
    -   cd maths-test

3. Install dependencies:
    -   npm install

4. Start development server:
    -   npm start

5. Open your browser and go to http://localhost:3000 to view the app