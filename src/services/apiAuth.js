import supabase, { supabaseUrl } from "./SupabaseClient";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error("email or password is not correct!");
  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error("email or password is not correct!");
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("can not sign out");
}

export async function signup({ email, password, fullName }) {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: fullName,
        avatar: "",
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function updateUser({ password, fullName, avatar }) {
  //1)Update the fullName and password
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { name: fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw error;
  if (!avatar) return data;

  //2)Upload the avatar image
  const avatarName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(avatarName, avatar);
  if (storageError) throw new Error(storageError.message);

  //3)Update the avatar in user itself
  const { data: updateduser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${avatarName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  return updateduser;
}
