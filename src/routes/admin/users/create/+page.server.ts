import { type Actions } from "@sveltejs/kit";
import {
  getComparableTodayDate,
  validateDateRange,
  validateEmailField,
  validateNameField,
} from "$lib/utils";
import {
  getAllModules,
  getAllActivities,
  getAllModulesAndActivities,
} from "$lib/server/services/adminCourses/adminCoursesRequest";
import { createUserProfile } from "$lib/server/services/adminUser/adminUserCommand";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Module, Activity } from "$lib/types";

let modules: Module[] = [];
let activities: Activity[] = [];
let modulesActivities: any[];
export const load: PageServerLoad = async () => {
  try {
    modules = await getAllModules();
    activities = await getAllActivities();
    modulesActivities = await getAllModulesAndActivities();
    console.log(JSON.stringify(modulesActivities, null, 2));
  } catch (error) {
    console.error(error);
  }

  return { modules, activities };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const lastname = data.get("lastname") as string;
    const firstname = data.get("firstname") as string;
    const email = data.get("email") as string;
    const validFromDateString = data.get("validFromDate") as string;
    const validToDateString = data.get("validToDate") as string;
    let validFromDate: Date | undefined;
    let validToDate: Date | undefined;
    let isValidFromDateInRange = true;
    let isValidToDateInRange = true;

    if (validFromDateString) {
      validFromDate = new Date(validFromDateString);
      isValidFromDateInRange = validateDateRange(
        validFromDate,
        getComparableTodayDate(),
      );
    }

    if (validToDateString) {
      validToDate = new Date(validToDateString);
      isValidToDateInRange = validateDateRange(
        validToDate,
        validFromDate ?? getComparableTodayDate(),
      );
    }

    const isLastnameValidated = validateNameField(lastname);
    const isFirstnameValidated = validateNameField(firstname);
    const isEmailValidated = validateEmailField(email);

    if (
      isLastnameValidated &&
      isFirstnameValidated &&
      isEmailValidated &&
      isValidFromDateInRange &&
      isValidToDateInRange
    ) {
      const { error: createUserProfileError } = await createUserProfile(
        email.toLocaleLowerCase(),
        lastname.toLocaleLowerCase(),
        firstname.toLocaleLowerCase(),
        validFromDate,
        validToDate,
      );
      if (createUserProfileError) {
        console.error(createUserProfileError);
        throw error(
          500,
          "Un problème est survenu lors de la création de l'utilisateur.",
        );
      }
    } else {
      throw error(400, "Echec lors de la validation de l'utilisateur.");
    }
  },
};
