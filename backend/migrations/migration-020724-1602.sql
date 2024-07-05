-- Initialises the database schema and respective tables

---------- PROFILES ----------
-- Profiles table to store user auth rows (foreign key to auth.users managed automatically by Supabase)
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Trigger function to create a new profile when a user is created
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (user_id, email, created_at)
    VALUES (NEW.id, NEW.email, NEW.created_at);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for the profiles table
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();


---------- ACCESS CODES --------
-- Access table with the required code to access the application
CREATE TABLE IF NOT EXISTS access (
    access_id SERIAL PRIMARY KEY,
    access_name VARCHAR(255),
    access_code CHAR(6) CHECK (access_code ~ '^[A-Z0-9]{6}$')
);

-- Function to generate a access code (6 characters long, letters and numbers only, uppercase)
CREATE OR REPLACE FUNCTION generate_access_code() RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result TEXT := '';
    i INTEGER := 0;
BEGIN
    FOR i IN 1..6 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to set the access code when a new access is created
CREATE OR REPLACE FUNCTION set_access_code() RETURNS TRIGGER AS $$
BEGIN
    NEW.access_code := generate_access_code();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for the access table
CREATE TRIGGER before_insert_access
BEFORE INSERT ON access
FOR EACH ROW
EXECUTE FUNCTION set_access_code();


-------- TASKS --------
-- Tasks table to store user tasks
CREATE TABLE tasks (
    task_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK (status IN ('To Do', 'In Progress', 'Done')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
