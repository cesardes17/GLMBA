create table public.competiciones (
  id uuid not null,
  nombre text not null,
  tipo text not null,
  temporada_id uuid not null,
  formato_partido text not null,
  constraint competiciones_pkey primary key (id),
  constraint competiciones_temporada_id_fkey foreign KEY (temporada_id) references temporadas (id),
  constraint competiciones_formato_partido_check check (
    (
      formato_partido = any (
        array[
          'ida'::text,
          'ida-vuelta'::text,
          'mejor-de-tres'::text
        ]
      )
    )
  ),
  constraint competiciones_tipo_check check (
    (
      tipo = any (array['liga'::text, 'eliminatoria'::text])
    )
  )
) TABLESPACE pg_default;