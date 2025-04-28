create table public.estadisticas_equipo_cuarto (
  id uuid not null,
  partido_id uuid not null,
  equipo_id uuid not null,
  cuarto text not null,
  puntos integer not null,
  faltas_equipo integer not null,
  tiempos_muertos integer not null,
  rebotes_totales integer null,
  posesiones integer null,
  porcentaje_tiro numeric null,
  constraint estadisticas_equipo_cuarto_pkey primary key (id),
  constraint estadisticas_equipo_cuarto_equipo_id_fkey foreign KEY (equipo_id) references equipos (id),
  constraint estadisticas_equipo_cuarto_partido_id_fkey foreign KEY (partido_id) references partidos (id)
) TABLESPACE pg_default;