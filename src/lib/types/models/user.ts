import type { User } from "@supabase/supabase-js";
import type { Tables } from "../database.types";
import { capitalize } from "$lib/utils";

export interface Profile {
  name: string;
  surname: string;
  email?: string;
  role: string;
  createDate: string;
  memberSince?: string;
}

export function generateProfile(row: Tables<'profiles'>, user: User): Profile {
  const profile: Profile = {
    name: capitalize(row.name),
    surname: capitalize(row.surname),
    email: user.email,
    role: row.role,
    createDate: row.created_at,
  }

  if (row.memberSince) {
    profile.memberSince = row.memberSince
  }

  return profile;
}
