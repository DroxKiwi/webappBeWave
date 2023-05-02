--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: artists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.artists (
    artist_id integer NOT NULL,
    name character varying(256) NOT NULL,
    description character varying(500),
    image_id integer
);


ALTER TABLE public.artists OWNER TO postgres;

--
-- Name: artists_artist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.artists_artist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.artists_artist_id_seq OWNER TO postgres;

--
-- Name: artists_artist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.artists_artist_id_seq OWNED BY public.artists.artist_id;


--
-- Name: betatesters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.betatesters (
    betatester_id integer NOT NULL,
    user_id integer,
    firstname character varying(80) NOT NULL,
    name character varying(80) NOT NULL,
    dob date NOT NULL,
    adress character varying(80) NOT NULL,
    phone integer NOT NULL
);


ALTER TABLE public.betatesters OWNER TO postgres;

--
-- Name: betatesters_betatester_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.betatesters_betatester_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.betatesters_betatester_id_seq OWNER TO postgres;

--
-- Name: betatesters_betatester_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.betatesters_betatester_id_seq OWNED BY public.betatesters.betatester_id;


--
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    city_id integer NOT NULL,
    name character varying(256) NOT NULL,
    postal_code character varying(5) NOT NULL
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- Name: cities_city_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cities_city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cities_city_id_seq OWNER TO postgres;

--
-- Name: cities_city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cities_city_id_seq OWNED BY public.cities.city_id;


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    contact_id integer NOT NULL,
    user_id integer,
    type character varying(80),
    message character varying(500)
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- Name: contacts_contact_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contacts_contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_contact_id_seq OWNER TO postgres;

--
-- Name: contacts_contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contacts_contact_id_seq OWNED BY public.contacts.contact_id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    event_id integer NOT NULL,
    author_name character varying(256) NOT NULL,
    name character varying(256) NOT NULL,
    description character varying(500),
    display_map boolean NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    price double precision
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_artists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events_artists (
    event_artist_id integer NOT NULL,
    event_id integer NOT NULL,
    artist_id integer NOT NULL
);


ALTER TABLE public.events_artists OWNER TO postgres;

--
-- Name: events_artists_event_artist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_artists_event_artist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_artists_event_artist_id_seq OWNER TO postgres;

--
-- Name: events_artists_event_artist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_artists_event_artist_id_seq OWNED BY public.events_artists.event_artist_id;


--
-- Name: events_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_event_id_seq OWNER TO postgres;

--
-- Name: events_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_event_id_seq OWNED BY public.events.event_id;


--
-- Name: events_external_medias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events_external_medias (
    event_external_media_id integer NOT NULL,
    event_id integer NOT NULL,
    external_media_id integer NOT NULL
);


ALTER TABLE public.events_external_medias OWNER TO postgres;

--
-- Name: events_external_medias_event_external_media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_external_medias_event_external_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_external_medias_event_external_media_id_seq OWNER TO postgres;

--
-- Name: events_external_medias_event_external_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_external_medias_event_external_media_id_seq OWNED BY public.events_external_medias.event_external_media_id;


--
-- Name: events_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events_images (
    event_image_id integer NOT NULL,
    event_id integer NOT NULL,
    image_id integer NOT NULL
);


ALTER TABLE public.events_images OWNER TO postgres;

--
-- Name: events_images_event_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_images_event_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_images_event_image_id_seq OWNER TO postgres;

--
-- Name: events_images_event_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_images_event_image_id_seq OWNED BY public.events_images.event_image_id;


--
-- Name: events_places; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events_places (
    event_place_id integer NOT NULL,
    event_id integer NOT NULL,
    place_id integer NOT NULL
);


ALTER TABLE public.events_places OWNER TO postgres;

--
-- Name: events_places_event_place_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_places_event_place_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_places_event_place_id_seq OWNER TO postgres;

--
-- Name: events_places_event_place_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_places_event_place_id_seq OWNED BY public.events_places.event_place_id;


--
-- Name: external_medias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.external_medias (
    external_media_id integer NOT NULL,
    url character varying(256) NOT NULL,
    media_platform_id integer
);


ALTER TABLE public.external_medias OWNER TO postgres;

--
-- Name: external_medias_external_media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.external_medias_external_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.external_medias_external_media_id_seq OWNER TO postgres;

--
-- Name: external_medias_external_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.external_medias_external_media_id_seq OWNED BY public.external_medias.external_media_id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    image_id integer NOT NULL,
    name character varying(256) NOT NULL,
    extension character varying(256) NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: images_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_image_id_seq OWNER TO postgres;

--
-- Name: images_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_image_id_seq OWNED BY public.images.image_id;


--
-- Name: logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logs (
    log_id integer NOT NULL,
    user_id integer NOT NULL,
    user_email character varying(256) NOT NULL,
    log_message character varying(256)
);


ALTER TABLE public.logs OWNER TO postgres;

--
-- Name: logs_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.logs_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.logs_log_id_seq OWNER TO postgres;

--
-- Name: logs_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.logs_log_id_seq OWNED BY public.logs.log_id;


--
-- Name: media_platform; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media_platform (
    media_platform_id integer NOT NULL,
    name character varying(256) NOT NULL
);


ALTER TABLE public.media_platform OWNER TO postgres;

--
-- Name: media_platform_media_platform_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.media_platform_media_platform_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.media_platform_media_platform_id_seq OWNER TO postgres;

--
-- Name: media_platform_media_platform_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.media_platform_media_platform_id_seq OWNED BY public.media_platform.media_platform_id;


--
-- Name: places; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.places (
    place_id integer NOT NULL,
    name character varying(256) NOT NULL,
    description character varying(500),
    adress character varying(256),
    image_id integer,
    city_id integer
);


ALTER TABLE public.places OWNER TO postgres;

--
-- Name: places_place_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.places_place_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.places_place_id_seq OWNER TO postgres;

--
-- Name: places_place_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.places_place_id_seq OWNED BY public.places.place_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    pseudo character varying(80) NOT NULL,
    email character varying(256) NOT NULL,
    token character varying(80),
    salt character varying(80),
    hash character varying(80),
    role character varying(80) NOT NULL,
    preferences text[]
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: artists artist_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artists ALTER COLUMN artist_id SET DEFAULT nextval('public.artists_artist_id_seq'::regclass);


--
-- Name: betatesters betatester_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.betatesters ALTER COLUMN betatester_id SET DEFAULT nextval('public.betatesters_betatester_id_seq'::regclass);


--
-- Name: cities city_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities ALTER COLUMN city_id SET DEFAULT nextval('public.cities_city_id_seq'::regclass);


--
-- Name: contacts contact_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts ALTER COLUMN contact_id SET DEFAULT nextval('public.contacts_contact_id_seq'::regclass);


--
-- Name: events event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN event_id SET DEFAULT nextval('public.events_event_id_seq'::regclass);


--
-- Name: events_artists event_artist_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_artists ALTER COLUMN event_artist_id SET DEFAULT nextval('public.events_artists_event_artist_id_seq'::regclass);


--
-- Name: events_external_medias event_external_media_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_external_medias ALTER COLUMN event_external_media_id SET DEFAULT nextval('public.events_external_medias_event_external_media_id_seq'::regclass);


--
-- Name: events_images event_image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_images ALTER COLUMN event_image_id SET DEFAULT nextval('public.events_images_event_image_id_seq'::regclass);


--
-- Name: events_places event_place_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_places ALTER COLUMN event_place_id SET DEFAULT nextval('public.events_places_event_place_id_seq'::regclass);


--
-- Name: external_medias external_media_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.external_medias ALTER COLUMN external_media_id SET DEFAULT nextval('public.external_medias_external_media_id_seq'::regclass);


--
-- Name: images image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN image_id SET DEFAULT nextval('public.images_image_id_seq'::regclass);


--
-- Name: logs log_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs ALTER COLUMN log_id SET DEFAULT nextval('public.logs_log_id_seq'::regclass);


--
-- Name: media_platform media_platform_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_platform ALTER COLUMN media_platform_id SET DEFAULT nextval('public.media_platform_media_platform_id_seq'::regclass);


--
-- Name: places place_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.places ALTER COLUMN place_id SET DEFAULT nextval('public.places_place_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: artists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.artists (artist_id, name, description, image_id) FROM stdin;
1	Shakira	ba tmtc	\N
2	Angel	fipehznkl	\N
3	DJ kpop	zfvs	\N
\.


--
-- Data for Name: betatesters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.betatesters (betatester_id, user_id, firstname, name, dob, adress, phone) FROM stdin;
\.


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cities (city_id, name, postal_code) FROM stdin;
1	Angers	49000
2	Nantes	44000
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts (contact_id, user_id, type, message) FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (event_id, author_name, name, description, display_map, start_date, end_date, price) FROM stdin;
2	admin	test	test	t	2023-04-02	2023-05-06	52
4	admin	ez^fjodsl,	ùgoirfknld	f	2023-03-26	2023-04-12	0
5	admin	zvjnsm	aephm!dkn	f	2023-03-28	2023-04-12	1
7	admin	ezf	zvd	f	2023-04-10	2023-04-12	25
1	admin	a	a	f	2023-01-26	2023-03-28	0
6	admin	zôdj	fzob	f	2023-04-04	2023-04-26	5
8	admin	azr	azr	f	2023-04-11	2023-04-19	5
3	admin	zefobvsnjl	ùofzknls!	f	2023-04-12	2023-04-29	0
9	admin	victor	victor	f	2023-05-08	2023-04-25	0
\.


--
-- Data for Name: events_artists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events_artists (event_artist_id, event_id, artist_id) FROM stdin;
3	4	3
4	5	2
5	7	3
6	8	1
7	8	2
8	8	3
9	3	2
10	3	1
\.


--
-- Data for Name: events_external_medias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events_external_medias (event_external_media_id, event_id, external_media_id) FROM stdin;
5	2	3
7	4	2
8	4	1
9	5	3
11	1	2
12	3	1
15	9	2
16	9	3
\.


--
-- Data for Name: events_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events_images (event_image_id, event_id, image_id) FROM stdin;
1	2	1
2	3	1
4	9	1
\.


--
-- Data for Name: events_places; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events_places (event_place_id, event_id, place_id) FROM stdin;
1	2	1
3	4	4
4	4	5
5	5	1
6	5	2
7	5	3
10	7	2
11	7	4
12	7	1
15	1	4
16	6	4
17	8	4
18	8	3
19	3	2
22	9	4
23	9	5
\.


--
-- Data for Name: external_medias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.external_medias (external_media_id, url, media_platform_id) FROM stdin;
1	www.test.com	\N
2	www.unautretest.com	\N
3	www.youtube.com	2
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (image_id, name, extension) FROM stdin;
1	budhaball	.jpg
2	Burger	.jpg
\.


--
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logs (log_id, user_id, user_email, log_message) FROM stdin;
1	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 00:14:41 GMT+0200 (Central European Summer Time) : Log in : admin
2	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 00:17:24 GMT+0200 (Central European Summer Time) : Update an event : a
3	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 00:17:36 GMT+0200 (Central European Summer Time) : Update an event : a
4	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 00:18:13 GMT+0200 (Central European Summer Time) : Update an event : a
5	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 00:18:26 GMT+0200 (Central European Summer Time) : Update an event : a
6	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 12:45:08 GMT+0200 (Central European Summer Time) : Update an artist : www.youtube.com
7	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 12:45:17 GMT+0200 (Central European Summer Time) : Update an artist : www.youtube.com
8	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 12:47:05 GMT+0200 (Central European Summer Time) : Update an artist : www.youtube.com
9	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 12:47:09 GMT+0200 (Central European Summer Time) : Update an artist : www.youtube.com
10	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 12:51:01 GMT+0200 (Central European Summer Time) : Create a user -> pseudo : test, email : test@test.com, role : ROLE_USER
11	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 12:52:09 GMT+0200 (Central European Summer Time) : Create a user -> pseudo : autre, email : autre@autre.com, role : ROLE_USER
12	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 12:57:33 GMT+0200 (Central European Summer Time) : Update a user : un autre test name
13	1	admin@admin.com	 : ROLE_ADMIN : Wed Apr 26 2023 12:57:39 GMT+0200 (Central European Summer Time) : Update a user : un autre test name
14	1	admin@admin.com	 : ROLE_ADMIN : Thu Apr 27 2023 18:40:20 GMT+0200 (Central European Summer Time) : Update an event : a
15	1	admin@admin.com	 : ROLE_ADMIN : Thu Apr 27 2023 18:54:19 GMT+0200 (Central European Summer Time) : Update a place : Angers 1
16	1	admin@admin.com	 : ROLE_ADMIN : Thu Apr 27 2023 18:54:25 GMT+0200 (Central European Summer Time) : Update a place : Angers 2
17	1	admin@admin.com	 : ROLE_ADMIN : Thu Apr 27 2023 18:54:37 GMT+0200 (Central European Summer Time) : Update a place : Angers 3
18	1	admin@admin.com	 : ROLE_ADMIN : Thu Apr 27 2023 18:54:44 GMT+0200 (Central European Summer Time) : Update a place : Nantes 1
19	1	admin@admin.com	 : ROLE_ADMIN : Thu Apr 27 2023 18:54:49 GMT+0200 (Central European Summer Time) : Update a place : Nantes 2
20	1	admin@admin.com	 : ROLE_ADMIN : Thu Apr 27 2023 18:55:16 GMT+0200 (Central European Summer Time) : Update an event : a
21	1	admin@admin.com	 : ROLE_ADMIN : Thu Apr 27 2023 18:55:31 GMT+0200 (Central European Summer Time) : Update an event : zôdj
22	1	admin@admin.com	 : ROLE_ADMIN : Fri Apr 28 2023 17:14:51 GMT+0200 (Central European Summer Time) : Update an event : zefobvsnjl
23	1	admin@admin.com	 : ROLE_ADMIN : Tue May 02 2023 20:30:44 GMT+0200 (Central European Summer Time) : Update an event : victor
\.


--
-- Data for Name: media_platform; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media_platform (media_platform_id, name) FROM stdin;
1	youtube
2	facebook
\.


--
-- Data for Name: places; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.places (place_id, name, description, adress, image_id, city_id) FROM stdin;
1	Angers 1	un eve	une adresse	\N	1
2	Angers 2	Un truc 	2 rue des grand fous	1	1
5	Angers 3	grzeùkvd,lm	987465 place foucault	\N	1
4	Nantes 1	felzkbn	1 place dartagnan	\N	2
3	Nantes 2	gùpeizrnkf	+46 avenue pattone	\N	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, pseudo, email, token, salt, hash, role, preferences) FROM stdin;
2	test	test@test.com	gnhs3MZz7wQ4WTot	Wi0YdAUAIQpTsXW2	BSaGcn7h2RIwflyC1T8CIqXxFj59h6vEHHDUL9Y+YG0=	ROLE_USER	{darkmode}
3	un autre test name	autre@autre.com	w_jeh2_VniK7JoAw	vVFFA2vsWetkiHLY	VbRZCOO243dpq5c48+ekM/mmfYxX6b+2VCk1dpfIzE4=	ROLE_ADMIN	[0:1]={undefined,darkmode}
1	admin	admin@admin.com	DkbrliiZZPW5n4Fi	OV8-A2V_5MwRyxu2	S52/2hKGho4DBkd/oxZnNlG1IJjLAu57ampXFWoeAqI=	ROLE_ADMIN	[0:1]={lightmode,darkmode}
\.


--
-- Name: artists_artist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.artists_artist_id_seq', 3, true);


--
-- Name: betatesters_betatester_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.betatesters_betatester_id_seq', 1, false);


--
-- Name: cities_city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cities_city_id_seq', 2, true);


--
-- Name: contacts_contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_contact_id_seq', 1, false);


--
-- Name: events_artists_event_artist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_artists_event_artist_id_seq', 10, true);


--
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_event_id_seq', 9, true);


--
-- Name: events_external_medias_event_external_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_external_medias_event_external_media_id_seq', 16, true);


--
-- Name: events_images_event_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_images_event_image_id_seq', 4, true);


--
-- Name: events_places_event_place_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_places_event_place_id_seq', 23, true);


--
-- Name: external_medias_external_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.external_medias_external_media_id_seq', 3, true);


--
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_image_id_seq', 2, true);


--
-- Name: logs_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logs_log_id_seq', 23, true);


--
-- Name: media_platform_media_platform_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_platform_media_platform_id_seq', 2, true);


--
-- Name: places_place_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.places_place_id_seq', 5, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (artist_id);


--
-- Name: betatesters betatesters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.betatesters
    ADD CONSTRAINT betatesters_pkey PRIMARY KEY (betatester_id);


--
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (city_id);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (contact_id);


--
-- Name: events_artists events_artists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_artists
    ADD CONSTRAINT events_artists_pkey PRIMARY KEY (event_artist_id);


--
-- Name: events_external_medias events_external_medias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_external_medias
    ADD CONSTRAINT events_external_medias_pkey PRIMARY KEY (event_external_media_id);


--
-- Name: events_images events_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_images
    ADD CONSTRAINT events_images_pkey PRIMARY KEY (event_image_id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


--
-- Name: events_places events_places_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_places
    ADD CONSTRAINT events_places_pkey PRIMARY KEY (event_place_id);


--
-- Name: external_medias external_medias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.external_medias
    ADD CONSTRAINT external_medias_pkey PRIMARY KEY (external_media_id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (image_id);


--
-- Name: logs logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (log_id);


--
-- Name: media_platform media_platform_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_platform
    ADD CONSTRAINT media_platform_pkey PRIMARY KEY (media_platform_id);


--
-- Name: places places_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.places
    ADD CONSTRAINT places_pkey PRIMARY KEY (place_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_pseudo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pseudo_key UNIQUE (pseudo);


--
-- Name: artists artists_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(image_id);


--
-- Name: betatesters betatesters_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.betatesters
    ADD CONSTRAINT betatesters_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: contacts contacts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: events_artists events_artists_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_artists
    ADD CONSTRAINT events_artists_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(artist_id);


--
-- Name: events_artists events_artists_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_artists
    ADD CONSTRAINT events_artists_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- Name: events_external_medias events_external_medias_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_external_medias
    ADD CONSTRAINT events_external_medias_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- Name: events_external_medias events_external_medias_external_media_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_external_medias
    ADD CONSTRAINT events_external_medias_external_media_id_fkey FOREIGN KEY (external_media_id) REFERENCES public.external_medias(external_media_id);


--
-- Name: events_images events_images_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_images
    ADD CONSTRAINT events_images_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- Name: events_images events_images_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_images
    ADD CONSTRAINT events_images_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(image_id);


--
-- Name: events_places events_places_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_places
    ADD CONSTRAINT events_places_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- Name: events_places events_places_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_places
    ADD CONSTRAINT events_places_place_id_fkey FOREIGN KEY (place_id) REFERENCES public.places(place_id);


--
-- Name: external_medias external_medias_media_platform_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.external_medias
    ADD CONSTRAINT external_medias_media_platform_id_fkey FOREIGN KEY (media_platform_id) REFERENCES public.media_platform(media_platform_id);


--
-- Name: places places_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.places
    ADD CONSTRAINT places_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(city_id);


--
-- Name: places places_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.places
    ADD CONSTRAINT places_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(image_id);


--
-- PostgreSQL database dump complete
--

