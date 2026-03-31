-- Update services table to use Guinean Franc (GNF) instead of XAF
ALTER TABLE public.services RENAME COLUMN price_xaf TO price_gnf;

-- Update all prices to Guinean Franc (1 XAF ≈ 48 GNF conversion)
UPDATE public.services SET price_gnf = CASE
  WHEN name = 'Tresses Africaines' THEN 720000  -- 15,000 XAF → 720,000 GNF
  WHEN name = 'Pose de Perruque' THEN 960000    -- 20,000 XAF → 960,000 GNF
  WHEN name = 'Coiffure Événementielle' THEN 1200000  -- 25,000 XAF → 1,200,000 GNF
  WHEN name = 'Maquillage Mariée' THEN 1440000  -- 30,000 XAF → 1,440,000 GNF
  WHEN name = 'Maquillage Soirée' THEN 960000   -- 20,000 XAF → 960,000 GNF
  WHEN name = 'Maquillage Photo' THEN 864000    -- 18,000 XAF → 864,000 GNF
  WHEN name = 'Formation Maquillage Pro' THEN 7200000  -- 150,000 XAF → 7,200,000 GNF
  WHEN name = 'Formation Coiffure' THEN 5760000  -- 120,000 XAF → 5,760,000 GNF
  ELSE price_gnf
END;
