import { supabaseAdminClient } from "$lib/server/db/adminClient";

export async function createUserProfile(email: string, lastname: string, firstname: string, validFromDate?: Date, validToDate?: Date): Promise<{ error: any }> {
  const { data: authUser, error: authError } = await supabaseAdminClient.auth.admin.createUser({
    email,
    email_confirm: true,
  });

  if (authError) {
    console.error(authError);
    return { error: authError }
  }

  const { error: profileError } = await supabaseAdminClient
    .from('profiles')
    .insert({
      id: authUser.user.id,
      email,
      firstname: firstname,
      lastname: lastname,
      validFrom: validFromDate?.toISOString() ?? null,
      validTo: validToDate?.toISOString() ?? null
    });

  if (profileError) {
    console.error(profileError);
    return { error: profileError }
  }

  return { error: null }
}

export async function updateUserProfile(id: string, email: string, lastname: string, firstname: string, validFromDate?: Date, validToDate?: Date): Promise<{ error: any }> {
  const { error: authError } = await supabaseAdminClient.auth.admin.updateUserById(id, { email });
  if (authError) {
    console.error(authError);
    return { error: authError }
  }
  const { error: updateError } = await supabaseAdminClient.from("profiles").upsert({ id, email, firstname, lastname, validFrom: validFromDate?.toISOString(), validTo: validToDate?.toISOString() });
  if (updateError) {
    console.error(updateError);
    return { error: updateError }
  }

  return { error: null }
}

export async function deleteUser(id: string): Promise<{ error: any }> {
  const { error: deletionError } = await supabaseAdminClient.auth.admin.deleteUser(id);

  if (deletionError) {
    console.error(deletionError.message);
  }

  return { error: deletionError }
}

export async function checkinUser(id: string): Promise<{ error: any }> {
  const { error: checkinUserError } = await supabaseAdminClient.from("profiles").update({ last_sign_in_at: new Date().toISOString() }).eq("id", id);
  if (checkinUserError) {
    console.error(checkinUserError);
  }

  return { error: checkinUserError };
}
