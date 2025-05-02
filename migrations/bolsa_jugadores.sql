create table public.bolsa_jugadores (
  id uuid primary key,
  jugador_id uuid not null,
  fecha_inscripcion timestamp without time zone not null default now(),
  constraint bolsa_jugadores_jugador_id_fkey
    foreign key (jugador_id) references jugadores (usuario_id)
      on delete cascade
) tablespace pg_default;