-- Add store column to orders table for pickup store
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS store TEXT DEFAULT '';
