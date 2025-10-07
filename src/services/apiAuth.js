import supabase from "./SupabaseClient";

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

export async function signup({ email, password, fullname }) {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: fullname,
        avatar: "",
      },
    },
  });
  if (error) throw error;
  return data;
}
