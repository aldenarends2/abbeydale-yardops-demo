-- Abbeydale YardOps / Hire-It catalogue seed loader
-- This file exists so the raw GitHub link opens correctly on mobile.
-- Full 365-item catalogue is stored in the app price memory JSON path:
-- assets/hire-it-may-2026-catalog-full.json

create extension if not exists pgcrypto;

create table if not exists supplier_catalog (
  id uuid primary key default gen_random_uuid(),
  supplier_name text not null,
  category text,
  item_name text not null,
  price_excl_vat numeric,
  price_incl_vat numeric,
  price_note text,
  source_page int,
  created_at timestamptz default now()
);

create unique index if not exists supplier_catalog_unique_item
on supplier_catalog (supplier_name, item_name);

insert into supplier_catalog (supplier_name, category, item_name, price_excl_vat, price_incl_vat, price_note, source_page) values
('Hire-It','ACCESS, LIFTING & HOISTING','Aerial Work Platform 12m working height/10m platform height (Parow Branch)',1125.00,1293.75,'Daily hire rate from Hire-It May 2026 price list',1),
('Hire-It','ACCESS, LIFTING & HOISTING','Block & Tackle 1-3 ton',161.00,185.15,'Daily hire rate from Hire-It May 2026 price list',1),
('Hire-It','CONCRETE','Drive Unit',165.00,189.75,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','CONCRETE','Poker Vibrator 28mm/38mm/45mm',169.00,194.35,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','CONCRETE','Poker Vibrator 60mm',185.00,212.75,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','CONCRETE','Concrete Mixer Large 360L Petrol or Electric',318.00,365.70,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','GENERATORS','Generator 6KW Inverter',425.00,488.75,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','GENERATORS','Generator 10kva Petrol / Diesel',560.00,644.00,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','PUMPS','Pump Centrifugal 3 inch',270.00,310.50,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','PUMPS','Pump Trash/Mud 3 inch',345.00,396.75,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','BREAKING','Breaker Medium Duty 16kg including first chisel',392.00,450.80,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','COMPACTION','Compactor Plate 150kg or 120kg',269.00,309.35,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','DRILLING','Core Drill Handheld up to 80mm',250.00,287.50,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','DRILLING','Core Drill Handheld up to 150mm',300.00,345.00,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','DRILLING','Magnetic Base Drill METABO/MAKITA Max 42mm',460.00,529.00,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','DRILLING','Rotary Hammer Drill 20mm SDS Plus',160.00,184.00,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','DRILLING','Rotary Hammer Drill 40mm SDS Max',271.00,311.65,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','GRINDING & CUTTING','Floor Grinder 250mm Diamond Disk',450.00,517.50,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','GRINDING & CUTTING','Angle Grinder 115mm / 4.5 inch',110.00,126.50,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','GRINDING & CUTTING','Angle Grinder 230mm / 9 inch',155.00,178.25,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','TOOLS','Sledge Hammer 14 pound',78.00,89.70,'Daily hire rate from Hire-It May 2026 price list',null),
('Hire-It','ACCESS','Scaffold / Access equipment',null,null,'P.O.R. Confirm with supplier',null),
('Hire-It','CLEANING','Pressure Washer',null,null,'Confirm with supplier',null)
on conflict (supplier_name, item_name) do update set
  category = excluded.category,
  price_excl_vat = excluded.price_excl_vat,
  price_incl_vat = excluded.price_incl_vat,
  price_note = excluded.price_note,
  source_page = excluded.source_page;

-- Quick tests:
-- select supplier_name, item_name, price_incl_vat from supplier_catalog where item_name ilike '%grinder%' order by price_incl_vat nulls last;
-- select supplier_name, item_name, price_incl_vat from supplier_catalog where item_name ilike '%poker%' order by price_incl_vat nulls last;
