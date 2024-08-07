# Task Manager
A task manager "to-do list" app, allowing a user to sign up and log in to create, read, update and delete tasks online (CRUD)
-   Database: PostgreSQL hosted on Supabase with RLS and authentication configured
-   Backend: NodeJS with Express.js using models-routes-controllers model (https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)
-   Frontend: ReactJS written mainly in Typescript, with CSS styling
-   Deployment: Hosted on Vercel (separate projects for frontend and backend)

-   ACCESS CODE (for Sign Up): Q0MB9Y

## Live Demo:
https://task-manager-frontend-sigma.vercel.app/

## Project Structure:
### backend/
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
