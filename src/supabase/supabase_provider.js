import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://biovthdsobsjaasqqeak.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpb3Z0aGRzb2JzamFhc3FxZWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODk0MTksImV4cCI6MjA2MTg2NTQxOX0.i-4K_2g1NHgDCORr-MBA3X4M0HKXKectLwOgeJZiH2M";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;