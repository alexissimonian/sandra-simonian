import type { Tables } from "../database.types";

export interface Module {
  id: string;
  name: string;
  description: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  name: string;
}

export type ModuleRow = Tables<"modules">;
export type ActivityRow = Tables<"activities">;

export type ModuleActivityRow = ModuleRow & {
  modules_activities: { activities: Activity }[];
};
