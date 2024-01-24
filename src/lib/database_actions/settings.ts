import { SettingOptions } from "@/types/database";
import { supabase } from "@/lib/supabseClient";

export const getUserSetting = async (
  user: { id: string },
  options: SettingOptions
) => {
  const { data, error } = await supabase
    .from("settings")
    .select(options.selectedColumns?.join(","))
    .eq("id", user.id);

  if (error) console.log("Error fetching settings:", error.message);

  return data;
};

export const updateUserSetting = async (
  user: { id: string },
  options: SettingOptions
) => {
  const { error } = await supabase
    .from("settings")
    .update(options)
    .eq("id", user.id);

  if (error) console.log("Error updating settings:", error.message);
  else console.log("Settings updated successfully");
};
