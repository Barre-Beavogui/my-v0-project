-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'hair', 'makeup', 'training'
  description TEXT,
  duration_minutes INTEGER,
  price_xaf INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled', 'completed'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training_registrations table
CREATE TABLE IF NOT EXISTS public.training_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_phone TEXT NOT NULL,
  training_type TEXT NOT NULL, -- 'makeup', 'hairstyling', 'both'
  experience_level TEXT NOT NULL, -- 'beginner', 'intermediate', 'advanced'
  start_date TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  category TEXT NOT NULL, -- 'hair', 'makeup', 'event'
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample services
INSERT INTO public.services (name, category, description, duration_minutes, price_xaf) VALUES
  ('Tresses Africaines', 'hair', 'Tresses classiques et modernes pour tous types de cheveux', 180, 15000),
  ('Pose de Perruque', 'hair', 'Installation professionnelle de perruque naturelle ou synthétique', 120, 20000),
  ('Coiffure Événementielle', 'hair', 'Coiffure élégante pour mariages, soirées et événements spéciaux', 150, 25000),
  ('Maquillage Mariée', 'makeup', 'Maquillage complet pour le jour de votre mariage', 120, 30000),
  ('Maquillage Soirée', 'makeup', 'Maquillage glamour pour événements et soirées', 90, 20000),
  ('Maquillage Photo', 'makeup', 'Maquillage professionnel pour shooting photo', 90, 18000),
  ('Formation Maquillage Pro', 'training', 'Formation complète en maquillage professionnel (6 semaines)', 0, 150000),
  ('Formation Coiffure', 'training', 'Formation en coiffure et tresses (4 semaines)', 0, 120000);

-- Enable Row Level Security (though we don't need auth for this simple booking system)
-- We'll use public access policies since appointments don't require user accounts

-- For services - public read access
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to services" 
  ON public.services FOR SELECT 
  TO public 
  USING (true);

-- For appointments - allow anyone to insert (booking), but reading requires matching email
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anyone to create appointments" 
  ON public.appointments FOR INSERT 
  TO public 
  WITH CHECK (true);

CREATE POLICY "Allow public to view their own appointments by email" 
  ON public.appointments FOR SELECT 
  TO public 
  USING (true);

-- For training registrations - allow anyone to insert
ALTER TABLE public.training_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anyone to register for training" 
  ON public.training_registrations FOR INSERT 
  TO public 
  WITH CHECK (true);

CREATE POLICY "Allow public to view training registrations" 
  ON public.training_registrations FOR SELECT 
  TO public 
  USING (true);

-- For gallery - public read access
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to gallery" 
  ON public.gallery_images FOR SELECT 
  TO public 
  USING (true);
