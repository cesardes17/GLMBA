create table public.temporadas (
  id uuid not null,
  nombre text not null,
  fecha_inicio date not null,
  fecha_fin date not null,
  estado text not null,
  constraint temporadas_pkey primary key (id),
  constraint temporadas_estado_check check (
    (
      estado = any (array['activa'::text, 'finalizada'::text])
    )
  )
) TABLESPACE pg_default;