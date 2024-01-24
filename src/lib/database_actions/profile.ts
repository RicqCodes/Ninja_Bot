import { ProfileOptions } from "@/types/database";
import { supabase } from "@/lib/supabseClient";
import { User, UserMetadata, UserResponse } from "@supabase/supabase-js";

export const getUserProfile = async (id: string, options: ProfileOptions) => {
  const { data, error, status } = await supabase
    .from("profiles")
    .select(options.selectedColumns?.join(","))
    .eq("id", id)
    .single();

  if (error) console.log("Error fetching profile:", error.message);

  return { data, error, status };
};

export const updateUserProfile = async (
  id: string,
  options: ProfileOptions
) => {
  const { error, status } = await supabase
    .from("profiles")
    .update(options)
    .eq("id", id);

  if (error) console.log("Error updating profile:", error.message);
  else console.log("Profile updated successfully");
};
