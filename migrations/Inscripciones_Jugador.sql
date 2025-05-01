create table public.inscripciones_jugador (
  id uuid not null,
  jugador_id bigint not null,
  equipo_id uuid not null,
  numero_camiseta integer not null,
  activo boolean not null default false,
  fecha_inscripcion timestamp without time zone null default now(),
  constraint inscripciones_jugador_pkey primary key (id),
  constraint inscripciones_jugador_equipo_id_fkey foreign KEY (equipo_id) references equipos (id),
  constraint inscripciones_jugador_jugador_id_fkey foreign KEY (jugador_id) references jugadores (id)
) TABLESPACE pg_default;