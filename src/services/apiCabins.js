import supabase, { supabaseUrl } from "./SupabaseClient";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.log(error.message);
    throw new Error("Cabins Can Not be Loaded");
  }
  return data;
}

/**https://gdvaljjgtxamgelngzoa.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg */

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
  const { data, error } = await supabase
    .from("Cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    throw new Error("Cabin can not be created");
  }
  const { error: StorageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  if (StorageError) {
    await supabase.from("Cabins").delete().eq("id", newCabin.id);
    throw new Error("Storage Error,Cabin can not be created");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabin can not be deleted");
  }
  return data;
}
