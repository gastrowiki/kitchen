CREATE extension IF NOT EXISTS "ltree";
CREATE extension IF NOT EXISTS "uuid-ossp";
CREATE extension IF NOT EXISTS "pgcrypto";

CREATE FUNCTION public.set_current_timestamp_updated_at()
  RETURNS trigger
  LANGUAGE plpgsql
  AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
  $$;

CREATE TABLE public.languages (
  code varchar(2) NOT NULL,
  oauth_providers jsonb DEFAULT '{}'::jsonb NOT NULL,
  public boolean NOT NULL DEFAULT false,
  PRIMARY KEY (code)
);

CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  username varchar(255) UNIQUE NOT NULL CHECK (username = lower(username)),
  given_name varchar(255) NOT NULL,
  middle_name varchar(255),
  family_name varchar(255),
  email varchar(255) NOT NULL UNIQUE CHECK (email = lower(email)),
  email_verified boolean DEFAULT false NOT NULL,
  phone_number varchar(35),
  phone_number_verified boolean DEFAULT false NOT NULL,
  website varchar(255),
  oauth_providers jsonb DEFAULT '{}'::jsonb NOT NULL,
  additional_info jsonb DEFAULT '{}'::jsonb NOT NULL,
  bio jsonb DEFAULT '{}'::jsonb NOT NULL,
  picture_id uuid,
  birthdate date,
  languages character(2)[] NOT NULL,
  encrypted_password varchar(255) NOT NULL,
  is_deleted boolean DEFAULT false NOT NULL,
  is_deleted_at timestamp with time zone,
  is_banned boolean DEFAULT false NOT NULL,
  is_banned_at timestamp with time zone,
  is_restricted boolean DEFAULT false NOT NULL,
  is_restricted_at timestamp with time zone,
  last_login timestamp with time zone,
  legal_address_id uuid,
  notification_preferences jsonb DEFAULT '{}'::jsonb NOT NULL,
  favorite_count integer DEFAULT 0 NOT NULL,
  permissions jsonb DEFAULT '{}'::jsonb NOT NULL,
  commission_rate real DEFAULT 0.7 NOT NULL,
  verified boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id)
);
CREATE TRIGGER set_public_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TABLE public.users_languages (
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  language_code varchar(2) NOT NULL REFERENCES public.languages(code) ON DELETE CASCADE,
  PRIMARY KEY (user_id, language_code)
);

CREATE TABLE public.addresses (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  name varchar(255),
  address1 varchar(255),
  address2 varchar(255),
  city varchar(255) NOT NULL,
  country varchar(255) NOT NULL,
  country_code varchar(2) NOT NULL,
  state varchar(255),
  state_code varchar(10),
  postal_code varchar(10),
  phone_number varchar(35),
  status integer DEFAULT 0 NOT NULL,
  validated boolean DEFAULT false NOT NULL,
  latitude double precision,
  longitude double precision,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);
CREATE TRIGGER set_public_addresses_updated_at
  BEFORE UPDATE ON public.addresses
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
ALTER TABLE public.users
  ADD CONSTRAINT users_legal_address_fk FOREIGN KEY(legal_address_id)
    REFERENCES public.addresses(id) ON DELETE SET NULL;

CREATE TABLE public.equipment (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  languages character(2)[] NOT NULL,
  title jsonb DEFAULT '{}'::jsonb NOT NULL,
  description jsonb DEFAULT '{}'::jsonb NOT NULL,
  affiliate_links jsonb DEFAULT '{}'::jsonb NOT NULL,
  PRIMARY KEY (id)
);
CREATE TRIGGER set_public_equipment_updated_at
  BEFORE UPDATE ON public.equipment
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TABLE public.methods (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  languages character(2)[] NOT NULL,
  title jsonb DEFAULT '{}'::jsonb NOT NULL,
  description jsonb DEFAULT '{}'::jsonb NOT NULL,
  warning jsonb DEFAULT '{}'::jsonb NOT NULL,
  suggested_duration integer,
  PRIMARY KEY (id)
);
CREATE TRIGGER set_public_methods_updated_at
  BEFORE UPDATE ON public.methods
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TABLE public.method_equipment (
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  method_id uuid NOT NULL REFERENCES public.methods(id) ON DELETE CASCADE,
  equipment_id uuid NOT NULL REFERENCES public.equipment(id) ON DELETE CASCADE,
  PRIMARY KEY (method_id, equipment_id)
);

CREATE TABLE public.ingredients (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  languages character(2)[] NOT NULL,
  title jsonb DEFAULT '{}'::jsonb NOT NULL,
  description jsonb DEFAULT '{}'::jsonb NOT NULL,
  PRIMARY KEY (id)
);
CREATE TRIGGER set_public_ingredients_updated_at
  BEFORE UPDATE ON public.ingredients
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TABLE public.media (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  mime_type varchar(76) NOT NULL,
  url varchar(255) NOT NULL,
  duration integer,
  height integer,
  width integer,
  thumbnail text,
  description jsonb DEFAULT '{}'::jsonb NOT NULL,
  "order" integer DEFAULT 0 NOT NULL,
  type varchar(255),
  languages character(2)[] NOT NULL,
  equipment_id uuid REFERENCES public.equipment(id) ON DELETE SET NULL,
  ingredient_id uuid REFERENCES public.ingredients(id) ON DELETE SET NULL,
  method_id uuid REFERENCES public.methods(id) ON DELETE SET NULL,
  recipe_id uuid,
  recipe_step_id uuid,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);
CREATE TRIGGER set_public_media_updated_at
  BEFORE UPDATE ON public.media
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
ALTER TABLE ONLY public.users
  ADD CONSTRAINT users_picture_id_fk FOREIGN KEY (picture_id)
  REFERENCES public.media(id) ON DELETE SET NULL;

CREATE TABLE public.recipe_steps (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  recipe_id uuid NOT NULL,
  path public.ltree NOT NULL,
  title jsonb DEFAULT '{}'::jsonb NOT NULL,
  description jsonb DEFAULT '{}'::jsonb NOT NULL,
  duration integer DEFAULT 0 NOT NULL,
  method_id uuid REFERENCES methods(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);
CREATE TRIGGER set_public_recipe_steps_updated_at
  BEFORE UPDATE ON public.recipe_steps
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
ALTER TABLE ONLY public.media
  ADD CONSTRAINT media_recipe_steps_id_fkey FOREIGN KEY (recipe_step_id)
  REFERENCES public.recipe_steps(id) ON DELETE SET NULL;

CREATE TABLE public.recipe_step_equipment (
  recipe_step_id uuid NOT NULL REFERENCES recipe_steps(id) ON DELETE CASCADE,
  equipment_id uuid NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  count integer DEFAULT 1 NOT NULL,
  recipe_id uuid NOT NULL,
  PRIMARY KEY (recipe_step_id, equipment_id)
);

CREATE TABLE public.recipe_step_ingredients (
  ingrediant_id uuid NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
  recipe_step_id uuid NOT NULL REFERENCES recipe_steps(id) ON DELETE CASCADE,
  weight integer,
  volume integer,
  count integer,
  recipe_id uuid NOT NULL,
  PRIMARY KEY (ingrediant_id, recipe_step_id),
  CONSTRAINT "At least one unit of measure" CHECK (((weight > 0) OR (volume > 0) OR (count > 0)))
);

CREATE TABLE public.recipes (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  title jsonb DEFAULT '{}'::jsonb NOT NULL,
  description jsonb DEFAULT '{}'::jsonb NOT NULL,
  teaser jsonb DEFAULT '{}'::jsonb NOT NULL,
  languages character(2)[] NOT NULL,
  duration integer DEFAULT 0 NOT NULL,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);
CREATE TRIGGER set_public_recipes_updated_at
  BEFORE UPDATE ON public.recipes
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
ALTER TABLE ONLY public.recipe_steps
  ADD CONSTRAINT recipe_steps_recipe_id_fkey FOREIGN KEY (recipe_id)
  REFERENCES public.recipes(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.recipe_step_equipment
  ADD CONSTRAINT recipe_step_equipment_recipe_id_fkey FOREIGN KEY (recipe_id)
  REFERENCES public.recipes(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.recipe_step_ingredients
  ADD CONSTRAINT recipe_step_ingredients_recipe_id_fkey FOREIGN KEY (recipe_id)
  REFERENCES public.recipes(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.media
  ADD CONSTRAINT media_recipe_id_fkey FOREIGN KEY (recipe_id)
  REFERENCES public.recipes(id) ON DELETE CASCADE;

CREATE TABLE public.recipes_languages (
  recipe_id uuid REFERENCES public.recipes(id) ON DELETE CASCADE,
  language_code varchar(2) NOT NULL REFERENCES public.languages(code) ON DELETE CASCADE,
  PRIMARY KEY (recipe_id, language_code)
);
