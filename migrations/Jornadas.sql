create table public.jornadas (
  id uuid not null,
  nombre text not null,
  fase text not null,
  orden integer not null,
  competicion_id uuid not null,
  constraint jornadas_pkey primary key (id),
  constraint jornadas_competicion_id_fkey foreign KEY (competicion_id) references competiciones (id)
) TABLESPACE pg_default;