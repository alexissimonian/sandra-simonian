import { getAllProfiles } from "$lib/server/services/adminUser/adminUserRequest";
import type { Profile } from "$lib/types";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { deleteUser } from "$lib/server/services/adminUser/adminUserCommand";
import { error, isHttpError } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  let profiles: Profile[] = [];
  try {
    profiles = await getAllProfiles();
  } catch (error) {
    console.error(error);
  }

  return { profiles }
}

export const actions: Actions = {
  deleteUser: async ({ request }) => {
    const data = await request.formData();
    const userId = data.get("userId") as string;

    try {
      await deleteUser(userId);
    } catch (deletionError) {
      if (isHttpError(deletionError)) {
        throw error(deletionError.status, deletionError.body.message);
      };
    }

    return { success: true }
  }
}
