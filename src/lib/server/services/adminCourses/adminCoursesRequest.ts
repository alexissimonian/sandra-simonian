import { supabaseAdminClient } from "$lib/server/db/adminClient";
import type { Module, ModuleActivityRow } from "$lib/types";
import { error } from "@sveltejs/kit";

export async function getAllModules(): Promise<Module[]> {
  const { data, error: getActivitiesAndModulesError } =
    await supabaseAdminClient
      .from("modules")
      .select("*, modules_activities(activities(*))");
  if (getActivitiesAndModulesError) {
    console.error(getActivitiesAndModulesError);
    throw error(
      500,
      "Un problème est survenu lors de la récupération des modules avec les activités.",
    );
  }
  const moduleActivities = generateModulesWithActivities(data);

  return moduleActivities;
}

function generateModulesWithActivities(
  modulesActivitiesRow: ModuleActivityRow[],
): Module[] {
  const moduleActivities = modulesActivitiesRow.map((mar) => {
    const module: Module = {
      id: mar.id,
      name: mar.name,
      description: mar.description,
      activities: mar.modules_activities.map((a) => a.activities),
    };
    return module;
  });
  return moduleActivities;
}
