import { supabaseAdminClient } from "$lib/server/db/adminClient";
import type { Profile } from "$lib/types";

export async function createUserProfile(email: string, lastname: string, firstname: string): Promise<Profile> {

}
