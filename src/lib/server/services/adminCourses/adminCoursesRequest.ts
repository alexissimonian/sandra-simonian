import { supabaseAdminClient } from "$lib/server/db/adminClient";
import type { Module, Activity, ModuleRow, ActivityRow } from "$lib/types";
import { error } from "@sveltejs/kit";

export async function getAllModules(): Promise<Module[]> {
  const { data, error: getModuleError } = await supabaseAdminClient
    .from("modules")
    .select("*");

  if (getModuleError) {
    console.error(getModuleError);
    throw error(
      500,
      "Un problème est survenu lors de la récupération des modules",
    );
  }

  let modules = data.map(generateModules);
  return modules;
}

export async function getAllActivities(): Promise<Activity[]> {
  const { data, error: getActivityError } = await supabaseAdminClient
    .from("activités")
    .select("*");

  if (getActivityError) {
    console.error(getActivityError);
    throw error(
      500,
      "Un problème est survenu lors de la récupération des modules",
    );
  }

  let activities = data.map(generateActivities);
  return activities;
}

export async function getAllModulesAndActivities(): Promise<any[]> {
  const { data, error: getActivitiesAndModulesError } =
    await supabaseAdminClient
      .from("modules")
      .select('*, "modules_activités"("activite_id", "activités"(*))');
  console.log(data);
  if (getActivitiesAndModulesError) {
    console.error(getActivitiesAndModulesError);
    throw error(
      500,
      "Un problème est survenu lors de la récupération des modules avec les activités.",
    );
  }

  return data;
}

function generateModules(row: ModuleRow): Module {
  const module: Module = {
    id: row.id,
    name: row.name,
    description: row.description,
  };

  return module;
}

function generateActivities(row: ActivityRow): Activity {
  const activity: Activity = {
    id: row.id,
    name: row.name,
  };

  return activity;
}
