import supabase, { supabaseUrl } from "./SupabaseClient";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.log(error.message);
    throw new Error("Cabins Can Not be Loaded");
  }
  return data;
}

export async function createCabin(newCabin, id) {
  console.log(id);
  const hasImage = typeof newCabin?.image === "string";
  console.log(hasImage);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  let query = supabase.from("Cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = supabase
      .from("Cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin can not be created");
  }
  if (!hasImage) {
    const { error: StorageError } = await supabase.storage
      .from("cabins-images")
      .upload(imageName, newCabin.image);

    if (StorageError) {
      await supabase.from("Cabins").delete().eq("id", newCabin.id);
      throw new Error("Storage Error,Cabin can not be created");
    }
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
