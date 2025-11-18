import { handleError } from "$lib/errors/errorHandler";
import { getAllProfiles } from "$lib/server/services/adminUser/adminUserRequest";
import type { Profile } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  let profiles: Profile[] = [];
  try {
    profiles = await getAllProfiles();
  } catch (error) {
    handleError(error);
  }

  return { profiles }
}
