import { UserAttributes } from "@supabase/supabase-js";
import { UserRegister } from "../features/authentication/useSignup";
import { supabase, supabaseUrl } from "./supabase";

export async function signUp(user: UserRegister) {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        fullname: user.fullname,
        avatar: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error) {
    throw new Error(error.message);
  }
  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export interface UpdateUserData {
  password?: string;
  fullname?: string;
  avatar?: File | null;
  data?: {
    fullname?: string;
    avatar?: File | null;
  };
}

export async function updateUser({ password, fullname, avatar }: UpdateUserData) {
  // 1. Initialize updateData as an empty object
  let updateData: UserAttributes = {};
  // 2. Update password OR fullname
  if (password) updateData = { password };
  if (fullname) updateData = { data: { fullname } };
  // 3. Update user
  const { data, error: userError } = await supabase.auth.updateUser(updateData);

  if (userError) throw new Error(userError.message);

  if (!avatar) return data;

  // 2. Upload the avatar image to supabase storage
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updatedUser, error: userError2 } = await supabase.auth.updateUser({
    data: {
      avatar: avatarUrl,
    },
  });

  if (userError2) throw new Error(userError2.message);

  return updatedUser;
}
