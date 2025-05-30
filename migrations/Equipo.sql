create table public.equipos (
  id uuid not null,
  nombre text not null,
  escudo_url text not null,
  capitan_id uuid not null,
  creado_en timestamp without time zone not null default now(),
  temporada_id uuid not null,
  constraint equipos_pkey primary key (id),
  constraint equipos_nombre_key unique (nombre),
  constraint equipos_capitan_id_fkey foreign KEY (capitan_id) references usuarios (id),
  constraint equipos_temporada_id_fkey foreign KEY (temporada_id) references temporadas (id)
) TABLESPACE pg_default;