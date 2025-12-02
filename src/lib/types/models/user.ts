import type { Tables } from "../database.types";

export interface Profile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  createDate: string;
  memberSince?: string;
  lastSignInDate?: string;
}

export type ProfileRow = Tables<'profiles'>;

