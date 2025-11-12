import { env as publicEnv } from "$env/dynamic/public";
import { createClient } from "@supabase/supabase-js";

const supabaseProjectUrl = publicEnv.PUBLIC_SUPABASE_URL;
const supabaseApiKey = publicEnv.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabaseClient = createClient(supabaseProjectUrl, supabaseApiKey);
