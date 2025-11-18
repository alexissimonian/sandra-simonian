import type { Tables } from "../database.types";

export interface Profile {
  name: string;
  surname: string;
  email: string;
  role: string;
  createDate: string;
  memberSince?: string;
  lastSignInDate?: string;
}

export type ProfileRow = Tables<'profiles'>;

