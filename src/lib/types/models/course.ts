import type { Tables } from "../database.types";

export interface Module {
  id: string;
  name: string;
  description: string;
}

export interface Activity {
  id: string;
  name: string;
}

export type ModuleRow = Tables<"modules">;
export type ActivityRow = Tables<"activités">;
