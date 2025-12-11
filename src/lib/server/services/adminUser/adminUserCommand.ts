import { supabaseAdminClient } from "$lib/server/db/adminClient";
import type { Profile } from "$lib/types";
import { error } from "@sveltejs/kit";

export async function createUserProfile(email: string, lastname: string, firstname: string, validFromDate?: Date, validToDate?: Date): Promise<Profile> {
  const { data: authUser, error: authError } = await supabaseAdminClient.auth.admin.createUser({
    email,
    email_confirm: true,
  });

  if (authError || !authUser.user) {
    console.error(authError?.message);
    throw error(500, authError?.message ?? "Erreur à la création de l'utilisateur !");
  }

  const { data: profile, error: profileError } = await supabaseAdminClient
    .from('profiles')
    .insert({
      id: authUser.user.id,
      email,
      firstname: firstname,
      lastname: lastname,
      validFrom: validFromDate?.toISOString() ?? null,
      validTo: validToDate?.toISOString() ?? null
    })
    .select()
    .single();

  if (profileError || !profile) {
    console.error(profileError?.message);
    throw error(500, profileError?.message ?? "Erreur à la création du profil");
  }

  return {
    id: profile.id,
    firstname: profile.name,
    lastname: profile.surname,
    email: profile.email,
    role: profile.role,
    createDate: profile.created_at,
    lastSignInDate: undefined,
    validFrom: profile.validFrom,
    validTo: profile.validTo
  };
}

export async function updateUserProfile(id: string, email: string, lastname: string, firstname: string, validFromDate?: Date, validToDate?: Date): Promise<{ error: any }> {
  const { error: authError } = await supabaseAdminClient.auth.admin.updateUserById(id, { email });
  if (authError) {
    console.error(authError);
    throw error(500, "Erreur à la modification de l'utilisateur !");
  }
  const { error: updateError } = await supabaseAdminClient.from("profiles").upsert({ id, email, firstname, lastname, validFrom: validFromDate?.toISOString(), validTo: validToDate?.toISOString() });
  if (updateError) {
    console.error(updateError);
    throw error(500, "Erreur à la modification de l'utilisateur !");
  }

  return { error: updateError }
}

export async function deleteUser(id: string): Promise<void> {
  const { error: deletionError } = await supabaseAdminClient.auth.admin.deleteUser(id);

  if (deletionError) {
    console.error(deletionError.message);
    throw error(500, "Impossible de supprimer l'utilisateur...");
  }
}
