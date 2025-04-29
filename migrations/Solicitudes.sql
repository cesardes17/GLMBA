create table public.solicitudes (
  id uuid not null,
  usuario_id uuid not null,
  tipo text not null,
  equipo_id uuid null,
  nombre_equipo text null,
  escudo_url text null,
  estado text not null,
  motivo text null,
  respuesta_admin text null,
  fecha_creacion timestamp without time zone not null default CURRENT_TIMESTAMP,
  fecha_respuesta timestamp without time zone null,
  constraint solicitudes_pkey primary key (id),
  constraint solicitudes_equipo_id_fkey foreign KEY (equipo_id) references equipos (id),
  constraint solicitudes_usuario_id_fkey foreign KEY (usuario_id) references usuarios (id),
  constraint solicitudes_estado_check check (
    (
      estado = any (
        array[
          'pendiente'::text,
          'aceptada'::text,
          'rechazada'::text
        ]
      )
    )
  ),
  constraint solicitudes_tipo_check check (
    (
      tipo = any (
        array[
          'crear_equipo'::text,
          'unirse_equipo'::text,
          'baja_equipo'::text,
          'disolver_equipo'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;