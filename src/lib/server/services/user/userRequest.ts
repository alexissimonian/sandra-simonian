import type { SupabaseClient } from "@supabase/supabase-js";
import type { DetailedProfileRow, Profile } from "$lib/types";
import { AppError } from "$lib/errors/errorHandler";
import { capitalize, assertType } from "$lib/utils";

export async function getUserProfile(supabase: SupabaseClient): Promise<DetailedProfileRow> {
  const { data, error } = await supabase.from("profiles").select().single();

  if (error) {
    console.error("Un problème est survenu lors de la récupération du profile: " + error.code)
    throw new AppError("Un problème est survenu lors de la récupération du profile", {
      redirectToErrorPage: true,
    })
  };
  return data;
}

export function generateProfile(row: DetailedProfileRow): Profile {
  const profile: Profile = {
    name: capitalize(assertType(row.name)),
    surname: capitalize(assertType(row.surname)),
    email: assertType(row.email),
    role: assertType(row.role),
    createDate: assertType(row.created_at),
    lastSignInDate: row.last_sign_in_at ?? undefined,
  }

  if (row.memberSince) {
    profile.memberSince = row.memberSince
  }

  return profile;
}
