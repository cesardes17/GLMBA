create table public.ofertas (
  id uuid not null,
  jugador_id bigint not null,
  equipo_id uuid not null,
  fecha_envio date not null,
  estado text not null,
  constraint ofertas_pkey primary key (id),
  constraint ofertas_equipo_id_fkey foreign KEY (equipo_id) references equipos (id),
  constraint ofertas_jugador_id_fkey foreign KEY (jugador_id) references jugadores (id),
  constraint ofertas_estado_check check (
    (
      estado = any (
        array[
          'pendiente'::text,
          'aceptada'::text,
          'rechazada'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;