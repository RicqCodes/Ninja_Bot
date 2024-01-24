import { UserSecretOptions } from "@/types/database";
import { supabase } from "@/lib/supabseClient";
import { toast } from "react-toastify";

export const getUserSecrets = async (
  id: string,
  options: UserSecretOptions
) => {
  const { data, error } = await supabase
    .from("user_secrets")
    .select("*")
    .eq("user_id", id)
    .single();

  return { data, error };
};

export const updateUserSecrets = async (
  id: string,
  options: UserSecretOptions
) => {
  const { error } = await supabase
    .from("user_secrets")
    .update(options)
    .eq("user_id", id);

  if (error) console.log("Error updating user secrets:", error.message);
  else console.log("User secrets updated successfully");
};

export const insertUserSecrets = async (
  id: string,
  options: UserSecretOptions
) => {
  const { error } = await supabase
    .from("user_secrets")
    .insert(options)
    .eq("id", id);

  if (error) console.log("Error creating user secrets:", error.message);
  else console.log("user secrets created successfully");
};
