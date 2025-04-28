create table public.jugadores (
  id bigint generated always as identity not null,
  usuario_id uuid not null,
  altura_cm integer not null,
  peso_kg integer null,
  posicion_preferida text not null,
  dorsal_preferido integer not null,
  foto_url text null,
  descripcion text null,
  sancionado boolean not null default false,
  constraint jugadores_pkey primary key (id),
  constraint jugadores_usuario_id_fkey foreign KEY (usuario_id) references usuarios (id)
) TABLESPACE pg_default;