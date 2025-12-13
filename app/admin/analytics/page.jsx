import { supabaseAdmin } from "../../../lib/supabase/admin";


export default async function Analytics() {
  const { data } = await supabaseAdmin.from("events").select("*");
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
