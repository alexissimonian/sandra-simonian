import type { SupabaseClient } from "@supabase/supabase-js";
import type { Profile } from "$lib/types";

export async function getUserProfile(userid: string, supabase: SupabaseClient): Promise<Profile> {
  const profileRow = await supabase.from("profiles").select().single();
}
