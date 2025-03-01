import { createClient } from "@supabase/supabase-js";

const SUPBASE_URL = import.meta.env.VITE_SUPBASE_URL;
const SUPBASE_KEY = import.meta.env.VITE_SUPBASE_KEY;

export const supbase = createClient(SUPBASE_URL, SUPBASE_KEY);
