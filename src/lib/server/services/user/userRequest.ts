import type { SupabaseClient } from "@supabase/supabase-js";
import type { Profile, ProfileRow } from "$lib/types";
import { capitalize } from "$lib/utils";

export async function getUserProfile(supabase: SupabaseClient): Promise<Profile> {
  const { data, error } = await supabase.from("profiles").select().single();

  if (error) {
    console.error("Un problème est survenu lors de la récupération du profil: " + error.message);
    throw new Error("Un problème est survenu lors de la récupération du profil.");
  };
  return generateProfile(data);
}

export function generateProfile(row: ProfileRow): Profile {
  const profile: Profile = {
    id: row.id,
    firstname: capitalize(row.firstname),
    lastname: capitalize(row.lastname),
    email: row.email,
    role: row.role,
    createDate: row.created_at,
    lastSignInDate: row.last_sign_in_at ?? undefined,
    validFrom: row.validFrom ?? undefined,
    validTo: row.validTo ?? undefined
  }

  return profile;
}
