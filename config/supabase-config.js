/* ════════════════════════════════════════════════════════════════
   JAYPEE — CONFIG SUPABASE
   Ce fichier connecte le site (public + admin) à votre projet Supabase.

   Ces deux valeurs sont publiques par nature (clé "anon" protégée par
   les policies RLS côté base de données) — il n'y a aucun risque à les
   exposer dans le code front-end.
════════════════════════════════════════════════════════════════ */

window.JAYPEE_SUPABASE_URL = "https://lqpssuhhebmycsivgbmg.supabase.co";
window.JAYPEE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxcHNzdWhoZWJteWNzaXZnYm1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NDQ2NjcsImV4cCI6MjA5OTAyMDY2N30.7u7oiU3wonFQswP293qVKndceqbwdzicU4pfX7HfdFQ";

/* Client Supabase partagé (nécessite le script CDN supabase-js chargé avant ce fichier) */
window.sb = window.supabase.createClient(
  window.JAYPEE_SUPABASE_URL,
  window.JAYPEE_SUPABASE_ANON_KEY
);
