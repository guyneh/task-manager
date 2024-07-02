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


---------- REFERRALS --------
-- Referrals table with the required code to access the application
CREATE TABLE IF NOT EXISTS referrals (
    referral_id SERIAL PRIMARY KEY,
    referral_name VARCHAR(255),
    referral_code CHAR(6) CHECK (referral_code ~ '^[A-Z0-9]{6}$')
);

-- Function to generate a referral code (6 characters long, letters and numbers only, uppercase)
CREATE OR REPLACE FUNCTION generate_referral_code() RETURNS TEXT AS $$
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

-- Trigger function to set the referral code when a new referral is created
CREATE OR REPLACE FUNCTION set_referral_code() RETURNS TRIGGER AS $$
BEGIN
    NEW.referral_code := generate_referral_code();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for the referrals table
CREATE TRIGGER before_insert_referrals
BEFORE INSERT ON referrals
FOR EACH ROW
EXECUTE FUNCTION set_referral_code();


-------- TASKS --------
-- Tasks table to store user tasks
CREATE TABLE IF NOT EXISTS tasks (
    task_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES profiles (user_id) ON DELETE CASCADE
);
