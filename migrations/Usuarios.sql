create table public.usuarios (
  id uuid not null,
  nombre text not null,
  apellidos text not null,
  email text not null,
  rol_id bigint not null,
  creado_en timestamp without time zone not null default now(),
  activo boolean not null default true,
  constraint usuarios_pkey primary key (id),
  constraint usuarios_email_key unique (email),
  constraint usuarios_rol_id_fkey foreign KEY (rol_id) references roles (id)
) TABLESPACE pg_default;