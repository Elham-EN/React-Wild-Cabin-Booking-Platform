import { CabinSetting, EditCabinSetting } from "../types/Setting";
import { supabase } from "./supabase";

export async function getSettings(): Promise<CabinSetting | undefined> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  const settingsData = data as CabinSetting;

  return settingsData;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting: EditCabinSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
