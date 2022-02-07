DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.users_languages CASCADE;
DROP TABLE IF EXISTS public.addresses CASCADE;
DROP TABLE IF EXISTS public.equipment CASCADE;
DROP TABLE IF EXISTS public.methods CASCADE;
DROP TABLE IF EXISTS public.method_equipment CASCADE;
DROP TABLE IF EXISTS public.ingredients CASCADE;
DROP TABLE IF EXISTS public.media CASCADE;
DROP TABLE IF EXISTS public.recipe_steps CASCADE;
DROP TABLE IF EXISTS public.recipe_step_equipment CASCADE;
DROP TABLE IF EXISTS public.recipe_step_ingredients CASCADE;
DROP TABLE IF EXISTS public.recipes CASCADE;
DROP TABLE IF EXISTS public.recipes_languages CASCADE;
DROP TABLE IF EXISTS public.languages CASCADE;

DROP FUNCTION IF EXISTS public.set_current_timestamp_updated_at();

DROP extension IF EXISTS "ltree";
DROP extension IF EXISTS "uuid-ossp";
DROP extension IF EXISTS "pgcrypto";
