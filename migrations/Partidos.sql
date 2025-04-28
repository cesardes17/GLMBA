create table public.partidos (
  id uuid not null,
  equipo_local_id uuid not null,
  equipo_visitante_id uuid not null,
  fecha_hora timestamp without time zone not null,
  lugar text not null,
  jornada_id uuid not null,
  partido_nro_en_serie integer null,
  estado text not null,
  equipo_ganador_id uuid null,
  constraint partidos_pkey primary key (id),
  constraint partidos_equipo_ganador_id_fkey foreign KEY (equipo_ganador_id) references equipos (id),
  constraint partidos_equipo_local_id_fkey foreign KEY (equipo_local_id) references equipos (id),
  constraint partidos_equipo_visitante_id_fkey foreign KEY (equipo_visitante_id) references equipos (id),
  constraint partidos_jornada_id_fkey foreign KEY (jornada_id) references jornadas (id),
  constraint partidos_estado_check check (
    (
      estado = any (
        array[
          'pendiente'::text,
          'en_juego'::text,
          'finalizado'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;