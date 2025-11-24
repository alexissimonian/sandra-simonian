import type { SupabaseClient } from "@supabase/supabase-js";
import type { Profile, ProfileRow } from "$lib/types";
import { AppError } from "$lib/errors/errorHandler";
import { capitalize } from "$lib/utils";

export async function getUserProfile(supabase: SupabaseClient): Promise<Profile> {
  const { data, error } = await supabase.from("profiles").select().single();

  if (error) {
    console.error("Un problème est survenu lors de la récupération du profile: " + error.message);
    throw new AppError("Un problème est survenu lors de la récupération du profile", {
      redirectToErrorPage: true,
    })
  };
  return generateProfile(data);
}

export function generateProfile(row: ProfileRow): Profile {
  const profile: Profile = {
    id: row.id,
    name: capitalize(row.name),
    surname: capitalize(row.surname),
    email: row.email,
    role: row.role,
    createDate: row.created_at,
    lastSignInDate: row.last_sign_in_at ?? undefined,
    memberSince: row.memberSince ?? undefined
  }

  return profile;
}
