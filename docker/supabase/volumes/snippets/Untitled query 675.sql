-- Tabelle notizen anlegen
CREATE TABLE IF NOT EXISTS notizen (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at           TIMESTAMPTZ DEFAULT now(),
  bereich              TEXT,
  kontext              TEXT,
  inhalt               TEXT NOT NULL,
  faellig_am           TIMESTAMPTZ,
  erledigt             BOOLEAN DEFAULT false,
  erinnerung_gesendet  BOOLEAN DEFAULT false,
  todo_id              TEXT
);

-- Kontakte erweitern
ALTER TABLE kontakte
ADD COLUMN IF NOT EXISTS onedrive_folder_id TEXT;
