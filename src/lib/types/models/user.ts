import type { Tables } from "../database.types";

export interface Profile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  createDate: string;
  lastSignInDate?: string;
  validFrom?: string;
  validTo?: string;
}

export type ProfileRow = Tables<'profiles'>;

