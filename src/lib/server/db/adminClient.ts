import { env as publicEnv } from "$env/dynamic/public";
import { env as privateEnv } from "$env/dynamic/private";
import { createClient } from "@supabase/supabase-js";

const supabaseProjectUrl = publicEnv.PUBLIC_SUPABASE_URL;
const supabaseApiKey = privateEnv.SECRET_SERVICE_ROLE_KEY;

export const supabaseAdminClient = createClient(supabaseProjectUrl, supabaseApiKey);
