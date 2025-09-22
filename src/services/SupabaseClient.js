import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gdvaljjgtxamgelngzoa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkdmFsampndHhhbWdlbG5nem9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMDMwOTMsImV4cCI6MjA3Mzg3OTA5M30.AOwSlm-MaDnErKP0A6v-RigDHricucyoLizdEQ6X8Ss";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
