import { supabaseAdminClient } from "$lib/server/db/adminClient";
import { generateProfile } from "$lib/server/services/user/userRequest";
import type { Profile } from "$lib/types";
import { error } from "@sveltejs/kit";

export async function getAllProfiles(): Promise<Profile[]> {
  const { data, error: profileError } = await supabaseAdminClient.from("profiles").select("*");

  if (profileError) {
    console.error("Error retreiving profiles: " + profileError.message);
    throw error(500, "Un problème est survenu lors de la récupération des profiles")
  }

  let profiles = data.map(generateProfile);

  return profiles;
}
