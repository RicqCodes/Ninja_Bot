import { TokenOwnedOptions } from "@/types/database";
import { supabase } from "@/lib/supabseClient";

export const getUserTokensOwned = async (
  user: { id: string },
  options: TokenOwnedOptions
) => {
  const { data, error } = await supabase
    .from("tokens_owned")
    .select("*")
    .eq("id", user.id);

  if (error) console.log("Error fetching settings:", error.message);

  return data;
};

export const updateUserTokensOwned = async (
  user: { id: string },
  options: TokenOwnedOptions
) => {
  const { error } = await supabase
    .from("tokens_owned")
    .update(options)
    .eq("id", user.id);

  if (error) console.log("Error updating tokens owned:", error.message);
  else console.log("User tokens owned updated successfully");
};

export const insertUserTokensOwned = async (
  user: { id: string },
  options: TokenOwnedOptions
) => {
  const { error } = await supabase.from("employees").insert(options);

  if (error) console.log("Error creating employee:", error.message);
  else console.log("Employee created successfully");
};
