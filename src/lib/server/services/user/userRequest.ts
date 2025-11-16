import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProfileRow } from "$lib/types";
import { AppError } from "$lib/errors/errorHandler";

export async function getUserProfile(supabase: SupabaseClient): Promise<ProfileRow> {
  const { data, error } = await supabase.from("profiles").select().single();

  if (error) {
    console.error("Un problème est survenu lors de la récupération du profile: " + error.code)
    throw new AppError("Un problème est survenu lors de la récupération du profile", {
      redirectToErrorPage: true,
    })
  };
  return data;
}
