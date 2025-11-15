import type { Database, Profile } from '$lib/types';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js'

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient<Database>
      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
      profile: Profile
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export { }
