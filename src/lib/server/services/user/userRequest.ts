import type { SupabaseClient } from "@supabase/supabase-js";
import type { Tables } from "$lib/types";

type ProfileRow = Tables<'profiles'>;

export async function getUserProfile(supabase: SupabaseClient): Promise<ProfileRow> {
  const { data, error } = await supabase.from("profiles").select().single();

  if (error) throw error;
  return data;
}
