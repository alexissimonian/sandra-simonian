import { supabaseAdminClient } from "$lib/server/db/adminClient";
import { generateProfile } from "$lib/server/services/user/userRequest";
import type { Profile } from "$lib/types";
import { error } from "@sveltejs/kit";

export async function getAllClientProfiles(): Promise<Profile[]> {
  const { data, error: profileError } = await supabaseAdminClient.from("profiles").select("*").eq("role", "client");

  if (profileError) {
    console.error("Error retreiving profiles: " + profileError.message);
    throw error(500, "Un problème est survenu lors de la récupération des profiles")
  }

  let profiles = data.map(generateProfile);

  return profiles;
}

export async function getValidDatesForEmail(email: string): Promise<{ validFromString: Date, validToString: Date, error: any }> {
  const { data, error: validDateError } = await supabaseAdminClient.from("profiles").select("validFrom, validTo").eq("email", email).single();
  if (validDateError) {
    console.error(validDateError);
  }

  return { validFromString: data?.validFrom, validToString: data?.validTo, error: validDateError }
}

export async function getUserProfileFromId(id: string): Promise<{ user: Profile, error: any }> {
  const { data, error: getProfileError } = await supabaseAdminClient.from("profiles").select("*").eq("id", id).single();
  if (getProfileError) {
    console.error(getProfileError);
  }

  return { user: data, error: getProfileError }
}
