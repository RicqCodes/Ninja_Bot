import { BotUpdateOptions } from "@/types/database";
import { supabase } from "@/lib/supabseClient";

export const getUserTokensOwned = async (
  user: { id: string },
  options: BotUpdateOptions
) => {
  const { data, error } = await supabase
    .from("bot_update")
    .select("*")
    .eq("id", user.id);

  if (error) console.log("Error fetching user secrets:", error.message);

  return data;
};

export const updateUserTokensOwned = async (
  user: { id: string },
  options: BotUpdateOptions
) => {
  const { error } = await supabase
    .from("bot_update")
    .update(options)
    .eq("id", user.id);

  if (error)
    console.log("Error updating bot transaction update:", error.message);
  else console.log("bot transaction updated successfully");
};

export const insertUserTokensOwned = async (
  user: { id: string },
  options: BotUpdateOptions
) => {
  const { error } = await supabase
    .from("bot_update")
    .insert(options)
    .eq("id", user.id);

  if (error) console.log("Error creating new bot transaction:", error.message);
  else console.log("bot transaction created successfully");
};
