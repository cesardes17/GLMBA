create table public.arbitros_partido (
  id uuid not null,
  usuario_id uuid not null,
  partido_id uuid not null,
  rol_en_partido text null,
  fecha_asignacion timestamp without time zone null,
  constraint arbitros_partido_pkey primary key (id),
  constraint arbitros_partido_partido_id_fkey foreign KEY (partido_id) references partidos (id),
  constraint arbitros_partido_usuario_id_fkey foreign KEY (usuario_id) references usuarios (id)
) TABLESPACE pg_default;