import { getAllClientProfiles } from "$lib/server/services/adminUser/adminUserRequest";
import type { Profile } from "$lib/types";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { deleteUser } from "$lib/server/services/adminUser/adminUserCommand";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  let profiles: Profile[] = [];
  try {
    profiles = await getAllClientProfiles();
  } catch (error) {
    console.error(error);
  }

  return { profiles }
}

export const actions: Actions = {
  deleteUser: async ({ request }) => {
    const data = await request.formData();
    const userId = data.get("userId") as string;

    const { error: deletionError } = await deleteUser(userId);
    if (deletionError) {
      console.error(deletionError);
      throw error(500, "Un problème est survenu lors de la suppression de l'utilisateur.");
    }

    return { success: true }
  }
}
