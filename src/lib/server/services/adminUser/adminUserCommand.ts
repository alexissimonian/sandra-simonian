import { AppError } from "$lib/errors/errorHandler";
import { supabaseAdminClient } from "$lib/server/db/adminClient";
import type { Profile } from "$lib/types";

export async function createUserProfile(email: string, lastname: string, firstname: string): Promise<Profile> {
  // Créer l'utilisateur dans auth.users
  const { data: authUser, error: authError } = await supabaseAdminClient.auth.admin.createUser({
    email,
    email_confirm: true,
  });

  if (authError || !authUser.user) {
    console.error(authError?.message);
    throw new AppError(`Erreur lors de la création de l'utilisateur: ${authError?.message}`);
  }

  // Créer le profil dans la table profiles
  const { data: profile, error: profileError } = await supabaseAdminClient
    .from('profiles')
    .insert({
      id: authUser.user.id,
      email,
      firstname: firstname,
      lastname: lastname,
    })
    .select()
    .single();

  if (profileError || !profile) {
    console.error(profileError?.message);
    throw new AppError(`Erreur lors de la création du profile: ${profileError?.message}`);
  }

  return {
    id: profile.id,
    firstname: profile.name,
    lastname: profile.surname,
    email: profile.email,
    role: profile.role,
    createDate: profile.created_at,
    memberSince: undefined,
    lastSignInDate: undefined,
  };
}
