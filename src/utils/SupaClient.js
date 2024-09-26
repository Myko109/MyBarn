import { createClient } from "@supabase/supabase-js";

const supaUrl = "https://gypbsaisblmgicbjarts.supabase.co";
const supaKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cGJzYWlzYmxtZ2ljYmphcnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MTEyOTksImV4cCI6MjA0MDM4NzI5OX0.suWKk2WmYYeejBPXYnetCqUslTqpWMf0H3fOHl2n3UM";

export const supabase = createClient(supaUrl, supaKey);
