--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (PGlite 0.2.0)
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = off;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET escape_string_warning = off;
SET row_security = off;

--
-- Name: meta; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA meta;


ALTER SCHEMA meta OWNER TO postgres;

--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;


--
-- Name: EXTENSION vector; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION vector IS 'vector data type and ivfflat and hnsw access methods';


--
-- Name: estado_oferta; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.estado_oferta AS ENUM (
    'pendiente',
    'aceptada',
    'rechazada'
);


ALTER TYPE public.estado_oferta OWNER TO postgres;

--
-- Name: estado_partido; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.estado_partido AS ENUM (
    'pendiente',
    'en_juego',
    'finalizado'
);


ALTER TYPE public.estado_partido OWNER TO postgres;

--
-- Name: estado_temporada; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.estado_temporada AS ENUM (
    'activa',
    'finalizada'
);


ALTER TYPE public.estado_temporada OWNER TO postgres;

--
-- Name: formato_partido; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.formato_partido AS ENUM (
    'ida',
    'ida-vuelta',
    'mejor-de-tres'
);


ALTER TYPE public.formato_partido OWNER TO postgres;

--
-- Name: tipo_competicion; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipo_competicion AS ENUM (
    'liga',
    'eliminatoria'
);


ALTER TYPE public.tipo_competicion OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: embeddings; Type: TABLE; Schema: meta; Owner: postgres
--

CREATE TABLE meta.embeddings (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    content text NOT NULL,
    embedding public.vector(384) NOT NULL
);


ALTER TABLE meta.embeddings OWNER TO postgres;

--
-- Name: embeddings_id_seq; Type: SEQUENCE; Schema: meta; Owner: postgres
--

ALTER TABLE meta.embeddings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME meta.embeddings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: migrations; Type: TABLE; Schema: meta; Owner: postgres
--

CREATE TABLE meta.migrations (
    version text NOT NULL,
    name text,
    applied_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE meta.migrations OWNER TO postgres;

--
-- Name: arbitros_partido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.arbitros_partido (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    usuario_id uuid NOT NULL,
    partido_id uuid NOT NULL,
    rol_en_partido text,
    fecha_asignacion timestamp with time zone
);


ALTER TABLE public.arbitros_partido OWNER TO postgres;

--
-- Name: competiciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competiciones (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre text NOT NULL,
    tipo public.tipo_competicion NOT NULL,
    temporada_id uuid NOT NULL,
    formato_partido public.formato_partido NOT NULL
);


ALTER TABLE public.competiciones OWNER TO postgres;

--
-- Name: equipos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre text NOT NULL,
    escudo_url text NOT NULL,
    capitan_id uuid NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.equipos OWNER TO postgres;

--
-- Name: estadisticas_equipo_cuarto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estadisticas_equipo_cuarto (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    partido_id uuid NOT NULL,
    equipo_id uuid NOT NULL,
    cuarto text NOT NULL,
    puntos integer NOT NULL,
    faltas_equipo integer NOT NULL,
    tiempos_muertos integer NOT NULL,
    rebotes_totales integer,
    posesiones integer,
    porcentaje_tiro numeric
);


ALTER TABLE public.estadisticas_equipo_cuarto OWNER TO postgres;

--
-- Name: estadisticas_jugador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estadisticas_jugador (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    partido_id uuid NOT NULL,
    jugador_id uuid NOT NULL,
    puntos_1 integer NOT NULL,
    puntos_2 integer NOT NULL,
    puntos_3 integer NOT NULL,
    asistencias integer NOT NULL,
    rebotes integer NOT NULL,
    robos integer NOT NULL,
    tapones integer NOT NULL,
    faltas integer NOT NULL,
    tiros_fallados_1 integer NOT NULL,
    tiros_fallados_2 integer NOT NULL,
    tiros_fallados_3 integer NOT NULL
);


ALTER TABLE public.estadisticas_jugador OWNER TO postgres;

--
-- Name: inscripciones_jugador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inscripciones_jugador (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    jugador_id uuid NOT NULL,
    temporada_id uuid NOT NULL,
    equipo_id uuid NOT NULL,
    numero_camiseta integer NOT NULL,
    activo boolean NOT NULL
);


ALTER TABLE public.inscripciones_jugador OWNER TO postgres;

--
-- Name: jornadas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jornadas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre text NOT NULL,
    fase text NOT NULL,
    orden integer NOT NULL,
    competicion_id uuid NOT NULL
);


ALTER TABLE public.jornadas OWNER TO postgres;

--
-- Name: jugadores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jugadores (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    usuario_id uuid NOT NULL,
    altura_cm integer NOT NULL,
    peso_kg integer,
    posicion_preferida text NOT NULL,
    dorsal_preferido integer NOT NULL,
    foto_url text NOT NULL,
    descripcion text,
    sancionado boolean NOT NULL
);


ALTER TABLE public.jugadores OWNER TO postgres;

--
-- Name: ofertas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ofertas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    jugador_id uuid NOT NULL,
    equipo_id uuid NOT NULL,
    fecha_envio date NOT NULL,
    estado public.estado_oferta NOT NULL
);


ALTER TABLE public.ofertas OWNER TO postgres;

--
-- Name: partidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partidos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    equipo_local_id uuid NOT NULL,
    equipo_visitante_id uuid NOT NULL,
    fecha_hora timestamp with time zone NOT NULL,
    lugar text NOT NULL,
    jornada_id uuid NOT NULL,
    partido_nro_en_serie integer,
    estado public.estado_partido NOT NULL,
    equipo_ganador_id uuid
);


ALTER TABLE public.partidos OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre text NOT NULL,
    descripcion text
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: temporadas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.temporadas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre text NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    estado public.estado_temporada NOT NULL
);


ALTER TABLE public.temporadas OWNER TO postgres;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre text NOT NULL,
    apellidos text NOT NULL,
    email text NOT NULL,
    rol_id uuid NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    activo boolean NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Data for Name: embeddings; Type: TABLE DATA; Schema: meta; Owner: postgres
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: meta; Owner: postgres
--

INSERT INTO meta.migrations VALUES ('202407160001', 'embeddings', '2025-04-15 17:03:57.801+00');


--
-- Data for Name: arbitros_partido; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: competiciones; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: equipos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: estadisticas_equipo_cuarto; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: estadisticas_jugador; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: inscripciones_jugador; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: jornadas; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: jugadores; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ofertas; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: partidos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: temporadas; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: embeddings_id_seq; Type: SEQUENCE SET; Schema: meta; Owner: postgres
--

SELECT pg_catalog.setval('meta.embeddings_id_seq', 1, false);


--
-- Name: embeddings embeddings_pkey; Type: CONSTRAINT; Schema: meta; Owner: postgres
--

ALTER TABLE ONLY meta.embeddings
    ADD CONSTRAINT embeddings_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: meta; Owner: postgres
--

ALTER TABLE ONLY meta.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (version);


--
-- Name: arbitros_partido arbitros_partido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arbitros_partido
    ADD CONSTRAINT arbitros_partido_pkey PRIMARY KEY (id);


--
-- Name: competiciones competiciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competiciones
    ADD CONSTRAINT competiciones_pkey PRIMARY KEY (id);


--
-- Name: equipos equipos_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT equipos_nombre_key UNIQUE (nombre);


--
-- Name: equipos equipos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT equipos_pkey PRIMARY KEY (id);


--
-- Name: estadisticas_equipo_cuarto estadisticas_equipo_cuarto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadisticas_equipo_cuarto
    ADD CONSTRAINT estadisticas_equipo_cuarto_pkey PRIMARY KEY (id);


--
-- Name: estadisticas_jugador estadisticas_jugador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadisticas_jugador
    ADD CONSTRAINT estadisticas_jugador_pkey PRIMARY KEY (id);


--
-- Name: inscripciones_jugador inscripciones_jugador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones_jugador
    ADD CONSTRAINT inscripciones_jugador_pkey PRIMARY KEY (id);


--
-- Name: jornadas jornadas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jornadas
    ADD CONSTRAINT jornadas_pkey PRIMARY KEY (id);


--
-- Name: jugadores jugadores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jugadores
    ADD CONSTRAINT jugadores_pkey PRIMARY KEY (id);


--
-- Name: ofertas ofertas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ofertas
    ADD CONSTRAINT ofertas_pkey PRIMARY KEY (id);


--
-- Name: partidos partidos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partidos
    ADD CONSTRAINT partidos_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: temporadas temporadas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temporadas
    ADD CONSTRAINT temporadas_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: arbitros_partido arbitros_partido_partido_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arbitros_partido
    ADD CONSTRAINT arbitros_partido_partido_id_fkey FOREIGN KEY (partido_id) REFERENCES public.partidos(id);


--
-- Name: arbitros_partido arbitros_partido_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arbitros_partido
    ADD CONSTRAINT arbitros_partido_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: competiciones competiciones_temporada_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competiciones
    ADD CONSTRAINT competiciones_temporada_id_fkey FOREIGN KEY (temporada_id) REFERENCES public.temporadas(id);


--
-- Name: equipos equipos_capitan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT equipos_capitan_id_fkey FOREIGN KEY (capitan_id) REFERENCES public.usuarios(id);


--
-- Name: estadisticas_equipo_cuarto estadisticas_equipo_cuarto_equipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadisticas_equipo_cuarto
    ADD CONSTRAINT estadisticas_equipo_cuarto_equipo_id_fkey FOREIGN KEY (equipo_id) REFERENCES public.equipos(id);


--
-- Name: estadisticas_equipo_cuarto estadisticas_equipo_cuarto_partido_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadisticas_equipo_cuarto
    ADD CONSTRAINT estadisticas_equipo_cuarto_partido_id_fkey FOREIGN KEY (partido_id) REFERENCES public.partidos(id);


--
-- Name: estadisticas_jugador estadisticas_jugador_jugador_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadisticas_jugador
    ADD CONSTRAINT estadisticas_jugador_jugador_id_fkey FOREIGN KEY (jugador_id) REFERENCES public.jugadores(id);


--
-- Name: estadisticas_jugador estadisticas_jugador_partido_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadisticas_jugador
    ADD CONSTRAINT estadisticas_jugador_partido_id_fkey FOREIGN KEY (partido_id) REFERENCES public.partidos(id);


--
-- Name: inscripciones_jugador inscripciones_jugador_equipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones_jugador
    ADD CONSTRAINT inscripciones_jugador_equipo_id_fkey FOREIGN KEY (equipo_id) REFERENCES public.equipos(id);


--
-- Name: inscripciones_jugador inscripciones_jugador_jugador_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones_jugador
    ADD CONSTRAINT inscripciones_jugador_jugador_id_fkey FOREIGN KEY (jugador_id) REFERENCES public.jugadores(id);


--
-- Name: inscripciones_jugador inscripciones_jugador_temporada_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones_jugador
    ADD CONSTRAINT inscripciones_jugador_temporada_id_fkey FOREIGN KEY (temporada_id) REFERENCES public.temporadas(id);


--
-- Name: jornadas jornadas_competicion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jornadas
    ADD CONSTRAINT jornadas_competicion_id_fkey FOREIGN KEY (competicion_id) REFERENCES public.competiciones(id);


--
-- Name: jugadores jugadores_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jugadores
    ADD CONSTRAINT jugadores_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: ofertas ofertas_equipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ofertas
    ADD CONSTRAINT ofertas_equipo_id_fkey FOREIGN KEY (equipo_id) REFERENCES public.equipos(id);


--
-- Name: ofertas ofertas_jugador_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ofertas
    ADD CONSTRAINT ofertas_jugador_id_fkey FOREIGN KEY (jugador_id) REFERENCES public.jugadores(id);


--
-- Name: partidos partidos_equipo_ganador_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partidos
    ADD CONSTRAINT partidos_equipo_ganador_id_fkey FOREIGN KEY (equipo_ganador_id) REFERENCES public.equipos(id);


--
-- Name: partidos partidos_equipo_local_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partidos
    ADD CONSTRAINT partidos_equipo_local_id_fkey FOREIGN KEY (equipo_local_id) REFERENCES public.equipos(id);


--
-- Name: partidos partidos_equipo_visitante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partidos
    ADD CONSTRAINT partidos_equipo_visitante_id_fkey FOREIGN KEY (equipo_visitante_id) REFERENCES public.equipos(id);


--
-- Name: partidos partidos_jornada_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partidos
    ADD CONSTRAINT partidos_jornada_id_fkey FOREIGN KEY (jornada_id) REFERENCES public.jornadas(id);


--
-- Name: usuarios usuarios_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

