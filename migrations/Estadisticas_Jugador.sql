create table public.estadisticas_jugador (
  id uuid not null,
  partido_id uuid not null,
  jugador_id bigint not null,
  puntos_1 integer not null,
  puntos_2 integer not null,
  puntos_3 integer not null,
  asistencias integer not null,
  rebotes integer not null,
  robos integer not null,
  tapones integer not null,
  faltas integer not null,
  tiros_fallados_1 integer not null,
  tiros_fallados_2 integer not null,
  tiros_fallados_3 integer not null,
  constraint estadisticas_jugador_pkey primary key (id),
  constraint estadisticas_jugador_jugador_id_fkey foreign KEY (jugador_id) references jugadores (id),
  constraint estadisticas_jugador_partido_id_fkey foreign KEY (partido_id) references partidos (id)
) TABLESPACE pg_default;