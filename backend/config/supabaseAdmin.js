// Configures the Supabase client for admin operations

import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

const supabaseAdminUrl = process.env.SUPABASE_URL;
const supabaseAdminKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseAdminUrl, supabaseAdminKey);

export default supabaseAdmin;
