--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-15 15:15:40

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
-- TOC entry 216 (class 1259 OID 18677)
-- Name: budynek; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.budynek (
    liczba_miejsc integer NOT NULL,
    numer_budynku character varying(5) NOT NULL,
    kod_pocztowy character varying(6) NOT NULL,
    budynek_id bigint NOT NULL,
    miasto character varying(80) NOT NULL,
    ulica character varying(80) NOT NULL
);


ALTER TABLE public.budynek OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 18676)
-- Name: budynek_budynek_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.budynek_budynek_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.budynek_budynek_id_seq OWNER TO postgres;

--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 215
-- Name: budynek_budynek_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.budynek_budynek_id_seq OWNED BY public.budynek.budynek_id;


--
-- TOC entry 218 (class 1259 OID 18684)
-- Name: cennik; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cennik (
    cena numeric(10,2) NOT NULL,
    data_koncowa date NOT NULL,
    data_poczatkowa date NOT NULL,
    cennik_id bigint NOT NULL,
    mieszkanie_id bigint NOT NULL
);


ALTER TABLE public.cennik OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 18683)
-- Name: cennik_cennik_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cennik_cennik_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cennik_cennik_id_seq OWNER TO postgres;

--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 217
-- Name: cennik_cennik_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cennik_cennik_id_seq OWNED BY public.cennik.cennik_id;


--
-- TOC entry 220 (class 1259 OID 18691)
-- Name: firma_podwykonawcza; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.firma_podwykonawcza (
    numer_budynku character varying(5) NOT NULL,
    numer_lokalu character varying(5),
    kod_pocztowy character varying(6) NOT NULL,
    firma_podwykonawcza_id bigint NOT NULL,
    nip character varying(10) NOT NULL,
    miasto character varying(80) NOT NULL,
    ulica character varying(80) NOT NULL,
    nazwa character varying(100) NOT NULL
);


ALTER TABLE public.firma_podwykonawcza OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 18690)
-- Name: firma_podwykonawcza_firma_podwykonawcza_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.firma_podwykonawcza_firma_podwykonawcza_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.firma_podwykonawcza_firma_podwykonawcza_id_seq OWNER TO postgres;

--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 219
-- Name: firma_podwykonawcza_firma_podwykonawcza_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.firma_podwykonawcza_firma_podwykonawcza_id_seq OWNED BY public.firma_podwykonawcza.firma_podwykonawcza_id;


--
-- TOC entry 222 (class 1259 OID 18700)
-- Name: meldunek; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meldunek (
    data_meldunku date NOT NULL,
    data_wymeldowania date,
    meldunek_id bigint NOT NULL,
    mieszkanie_id bigint NOT NULL,
    osoba_id bigint NOT NULL
);


ALTER TABLE public.meldunek OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 18699)
-- Name: meldunek_meldunek_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.meldunek_meldunek_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.meldunek_meldunek_id_seq OWNER TO postgres;

--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 221
-- Name: meldunek_meldunek_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.meldunek_meldunek_id_seq OWNED BY public.meldunek.meldunek_id;


--
-- TOC entry 224 (class 1259 OID 18707)
-- Name: mieszkanie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mieszkanie (
    liczba_mieszkancow smallint NOT NULL,
    numer_mieszkania integer NOT NULL,
    pietro smallint NOT NULL,
    budynek_id bigint NOT NULL,
    mieszkanie_id bigint NOT NULL,
    opis character varying(65535)
);


ALTER TABLE public.mieszkanie OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 18706)
-- Name: mieszkanie_mieszkanie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mieszkanie_mieszkanie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mieszkanie_mieszkanie_id_seq OWNER TO postgres;

--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 223
-- Name: mieszkanie_mieszkanie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mieszkanie_mieszkanie_id_seq OWNED BY public.mieszkanie.mieszkanie_id;


--
-- TOC entry 226 (class 1259 OID 18716)
-- Name: osoba; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.osoba (
    osoba_id bigint NOT NULL,
    pesel character varying(11) NOT NULL,
    imie character varying(40) NOT NULL,
    nazwisko character varying(40) NOT NULL
);


ALTER TABLE public.osoba OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 18715)
-- Name: osoba_osoba_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.osoba_osoba_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.osoba_osoba_id_seq OWNER TO postgres;

--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 225
-- Name: osoba_osoba_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.osoba_osoba_id_seq OWNED BY public.osoba.osoba_id;


--
-- TOC entry 228 (class 1259 OID 18725)
-- Name: platnosc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.platnosc (
    data_zrealizowania date NOT NULL,
    wartosc numeric(10,2) NOT NULL,
    platnosc_id bigint NOT NULL,
    umowa_id bigint,
    zadanie_id bigint
);


ALTER TABLE public.platnosc OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 18724)
-- Name: platnosc_platnosc_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.platnosc_platnosc_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.platnosc_platnosc_id_seq OWNER TO postgres;

--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 227
-- Name: platnosc_platnosc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.platnosc_platnosc_id_seq OWNED BY public.platnosc.platnosc_id;


--
-- TOC entry 230 (class 1259 OID 18732)
-- Name: umowa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.umowa (
    data_zawarcia date NOT NULL,
    cennik_id bigint NOT NULL,
    osoba_id bigint NOT NULL,
    umowa_id bigint NOT NULL
);


ALTER TABLE public.umowa OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 18731)
-- Name: umowa_umowa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.umowa_umowa_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.umowa_umowa_id_seq OWNER TO postgres;

--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 229
-- Name: umowa_umowa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.umowa_umowa_id_seq OWNED BY public.umowa.umowa_id;


--
-- TOC entry 232 (class 1259 OID 18739)
-- Name: zadanie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zadanie (
    data_rozpoczecia date NOT NULL,
    data_zakonczenia date,
    koszt numeric(10,2) NOT NULL,
    firma_podwykonawcza_id bigint,
    zadanie_id bigint NOT NULL,
    zgloszenie_id bigint NOT NULL,
    opis character varying(65535)
);


ALTER TABLE public.zadanie OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 18738)
-- Name: zadanie_zadanie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zadanie_zadanie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.zadanie_zadanie_id_seq OWNER TO postgres;

--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 231
-- Name: zadanie_zadanie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zadanie_zadanie_id_seq OWNED BY public.zadanie.zadanie_id;


--
-- TOC entry 234 (class 1259 OID 18748)
-- Name: zgloszenie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zgloszenie (
    data_wykonania date,
    data_zgloszenia date NOT NULL,
    koszt_calkowity numeric(10,2),
    priorytet smallint NOT NULL,
    budynek_id bigint,
    meldunek_id bigint,
    mieszkanie_id bigint,
    zgloszenie_id bigint NOT NULL,
    status_zgloszenia character varying(255) NOT NULL,
    typ_zgloszenia character varying(255) NOT NULL,
    CONSTRAINT zgloszenie_status_zgloszenia_check CHECK (((status_zgloszenia)::text = ANY ((ARRAY['ZGLOSZONE'::character varying, 'W_TRAKCIE'::character varying, 'ZAKONCZONE'::character varying])::text[]))),
    CONSTRAINT zgloszenie_typ_zgloszenia_check CHECK (((typ_zgloszenia)::text = ANY ((ARRAY['REMONT'::character varying, 'USTERKA'::character varying])::text[])))
);


ALTER TABLE public.zgloszenie OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 18747)
-- Name: zgloszenie_zgloszenie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zgloszenie_zgloszenie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.zgloszenie_zgloszenie_id_seq OWNER TO postgres;

--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 233
-- Name: zgloszenie_zgloszenie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zgloszenie_zgloszenie_id_seq OWNED BY public.zgloszenie.zgloszenie_id;


--
-- TOC entry 4733 (class 2604 OID 18680)
-- Name: budynek budynek_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.budynek ALTER COLUMN budynek_id SET DEFAULT nextval('public.budynek_budynek_id_seq'::regclass);


--
-- TOC entry 4734 (class 2604 OID 18687)
-- Name: cennik cennik_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cennik ALTER COLUMN cennik_id SET DEFAULT nextval('public.cennik_cennik_id_seq'::regclass);


--
-- TOC entry 4735 (class 2604 OID 18694)
-- Name: firma_podwykonawcza firma_podwykonawcza_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.firma_podwykonawcza ALTER COLUMN firma_podwykonawcza_id SET DEFAULT nextval('public.firma_podwykonawcza_firma_podwykonawcza_id_seq'::regclass);


--
-- TOC entry 4736 (class 2604 OID 18703)
-- Name: meldunek meldunek_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meldunek ALTER COLUMN meldunek_id SET DEFAULT nextval('public.meldunek_meldunek_id_seq'::regclass);


--
-- TOC entry 4737 (class 2604 OID 18710)
-- Name: mieszkanie mieszkanie_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mieszkanie ALTER COLUMN mieszkanie_id SET DEFAULT nextval('public.mieszkanie_mieszkanie_id_seq'::regclass);


--
-- TOC entry 4738 (class 2604 OID 18719)
-- Name: osoba osoba_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.osoba ALTER COLUMN osoba_id SET DEFAULT nextval('public.osoba_osoba_id_seq'::regclass);


--
-- TOC entry 4739 (class 2604 OID 18728)
-- Name: platnosc platnosc_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platnosc ALTER COLUMN platnosc_id SET DEFAULT nextval('public.platnosc_platnosc_id_seq'::regclass);


--
-- TOC entry 4740 (class 2604 OID 18735)
-- Name: umowa umowa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.umowa ALTER COLUMN umowa_id SET DEFAULT nextval('public.umowa_umowa_id_seq'::regclass);


--
-- TOC entry 4741 (class 2604 OID 18742)
-- Name: zadanie zadanie_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zadanie ALTER COLUMN zadanie_id SET DEFAULT nextval('public.zadanie_zadanie_id_seq'::regclass);


--
-- TOC entry 4742 (class 2604 OID 18751)
-- Name: zgloszenie zgloszenie_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenie ALTER COLUMN zgloszenie_id SET DEFAULT nextval('public.zgloszenie_zgloszenie_id_seq'::regclass);


--
-- TOC entry 4926 (class 0 OID 18677)
-- Dependencies: 216
-- Data for Name: budynek; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.budynek (liczba_miejsc, numer_budynku, kod_pocztowy, budynek_id, miasto, ulica) FROM stdin;
\.


--
-- TOC entry 4928 (class 0 OID 18684)
-- Dependencies: 218
-- Data for Name: cennik; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cennik (cena, data_koncowa, data_poczatkowa, cennik_id, mieszkanie_id) FROM stdin;
\.


--
-- TOC entry 4930 (class 0 OID 18691)
-- Dependencies: 220
-- Data for Name: firma_podwykonawcza; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.firma_podwykonawcza (numer_budynku, numer_lokalu, kod_pocztowy, firma_podwykonawcza_id, nip, miasto, ulica, nazwa) FROM stdin;
\.


--
-- TOC entry 4932 (class 0 OID 18700)
-- Dependencies: 222
-- Data for Name: meldunek; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meldunek (data_meldunku, data_wymeldowania, meldunek_id, mieszkanie_id, osoba_id) FROM stdin;
\.


--
-- TOC entry 4934 (class 0 OID 18707)
-- Dependencies: 224
-- Data for Name: mieszkanie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mieszkanie (liczba_mieszkancow, numer_mieszkania, pietro, budynek_id, mieszkanie_id, opis) FROM stdin;
\.


--
-- TOC entry 4936 (class 0 OID 18716)
-- Dependencies: 226
-- Data for Name: osoba; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.osoba (osoba_id, pesel, imie, nazwisko) FROM stdin;
\.


--
-- TOC entry 4938 (class 0 OID 18725)
-- Dependencies: 228
-- Data for Name: platnosc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.platnosc (data_zrealizowania, wartosc, platnosc_id, umowa_id, zadanie_id) FROM stdin;
\.


--
-- TOC entry 4940 (class 0 OID 18732)
-- Dependencies: 230
-- Data for Name: umowa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.umowa (data_zawarcia, cennik_id, osoba_id, umowa_id) FROM stdin;
\.


--
-- TOC entry 4942 (class 0 OID 18739)
-- Dependencies: 232
-- Data for Name: zadanie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zadanie (data_rozpoczecia, data_zakonczenia, koszt, firma_podwykonawcza_id, zadanie_id, zgloszenie_id, opis) FROM stdin;
\.


--
-- TOC entry 4944 (class 0 OID 18748)
-- Dependencies: 234
-- Data for Name: zgloszenie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zgloszenie (data_wykonania, data_zgloszenia, koszt_calkowity, priorytet, budynek_id, meldunek_id, mieszkanie_id, zgloszenie_id, status_zgloszenia, typ_zgloszenia) FROM stdin;
\.


--
-- TOC entry 4960 (class 0 OID 0)
-- Dependencies: 215
-- Name: budynek_budynek_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.budynek_budynek_id_seq', 1, false);


--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 217
-- Name: cennik_cennik_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cennik_cennik_id_seq', 1, false);


--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 219
-- Name: firma_podwykonawcza_firma_podwykonawcza_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.firma_podwykonawcza_firma_podwykonawcza_id_seq', 1, false);


--
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 221
-- Name: meldunek_meldunek_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.meldunek_meldunek_id_seq', 1, false);


--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 223
-- Name: mieszkanie_mieszkanie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mieszkanie_mieszkanie_id_seq', 1, false);


--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 225
-- Name: osoba_osoba_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.osoba_osoba_id_seq', 1, false);


--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 227
-- Name: platnosc_platnosc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.platnosc_platnosc_id_seq', 1, false);


--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 229
-- Name: umowa_umowa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.umowa_umowa_id_seq', 1, false);


--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 231
-- Name: zadanie_zadanie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zadanie_zadanie_id_seq', 1, false);


--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 233
-- Name: zgloszenie_zgloszenie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zgloszenie_zgloszenie_id_seq', 1, false);


--
-- TOC entry 4746 (class 2606 OID 18682)
-- Name: budynek budynek_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.budynek
    ADD CONSTRAINT budynek_pkey PRIMARY KEY (budynek_id);


--
-- TOC entry 4748 (class 2606 OID 18689)
-- Name: cennik cennik_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cennik
    ADD CONSTRAINT cennik_pkey PRIMARY KEY (cennik_id);


--
-- TOC entry 4750 (class 2606 OID 18698)
-- Name: firma_podwykonawcza firma_podwykonawcza_nip_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.firma_podwykonawcza
    ADD CONSTRAINT firma_podwykonawcza_nip_key UNIQUE (nip);


--
-- TOC entry 4752 (class 2606 OID 18696)
-- Name: firma_podwykonawcza firma_podwykonawcza_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.firma_podwykonawcza
    ADD CONSTRAINT firma_podwykonawcza_pkey PRIMARY KEY (firma_podwykonawcza_id);


--
-- TOC entry 4754 (class 2606 OID 18705)
-- Name: meldunek meldunek_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meldunek
    ADD CONSTRAINT meldunek_pkey PRIMARY KEY (meldunek_id);


--
-- TOC entry 4756 (class 2606 OID 18714)
-- Name: mieszkanie mieszkanie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mieszkanie
    ADD CONSTRAINT mieszkanie_pkey PRIMARY KEY (mieszkanie_id);


--
-- TOC entry 4758 (class 2606 OID 18723)
-- Name: osoba osoba_pesel_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT osoba_pesel_key UNIQUE (pesel);


--
-- TOC entry 4760 (class 2606 OID 18721)
-- Name: osoba osoba_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT osoba_pkey PRIMARY KEY (osoba_id);


--
-- TOC entry 4762 (class 2606 OID 18730)
-- Name: platnosc platnosc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platnosc
    ADD CONSTRAINT platnosc_pkey PRIMARY KEY (platnosc_id);


--
-- TOC entry 4764 (class 2606 OID 18737)
-- Name: umowa umowa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.umowa
    ADD CONSTRAINT umowa_pkey PRIMARY KEY (umowa_id);


--
-- TOC entry 4766 (class 2606 OID 18746)
-- Name: zadanie zadanie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zadanie
    ADD CONSTRAINT zadanie_pkey PRIMARY KEY (zadanie_id);


--
-- TOC entry 4768 (class 2606 OID 18757)
-- Name: zgloszenie zgloszenie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenie
    ADD CONSTRAINT zgloszenie_pkey PRIMARY KEY (zgloszenie_id);


--
-- TOC entry 4777 (class 2606 OID 18798)
-- Name: zadanie fk1ysygm278qtdf49qf2ti1p05f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zadanie
    ADD CONSTRAINT fk1ysygm278qtdf49qf2ti1p05f FOREIGN KEY (firma_podwykonawcza_id) REFERENCES public.firma_podwykonawcza(firma_podwykonawcza_id);


--
-- TOC entry 4772 (class 2606 OID 18773)
-- Name: mieszkanie fk6y028d19vsg44qcjcaui30t92; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mieszkanie
    ADD CONSTRAINT fk6y028d19vsg44qcjcaui30t92 FOREIGN KEY (budynek_id) REFERENCES public.budynek(budynek_id);


--
-- TOC entry 4770 (class 2606 OID 18768)
-- Name: meldunek fk90c3y55djifqi04mc253r93fw; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meldunek
    ADD CONSTRAINT fk90c3y55djifqi04mc253r93fw FOREIGN KEY (osoba_id) REFERENCES public.osoba(osoba_id);


--
-- TOC entry 4775 (class 2606 OID 18788)
-- Name: umowa fk953ovkdysrlynsdngjejs5qnu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.umowa
    ADD CONSTRAINT fk953ovkdysrlynsdngjejs5qnu FOREIGN KEY (cennik_id) REFERENCES public.cennik(cennik_id);


--
-- TOC entry 4779 (class 2606 OID 18818)
-- Name: zgloszenie fke0q0gv7tjroc7can7gwelb3sx; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenie
    ADD CONSTRAINT fke0q0gv7tjroc7can7gwelb3sx FOREIGN KEY (mieszkanie_id) REFERENCES public.mieszkanie(mieszkanie_id);


--
-- TOC entry 4776 (class 2606 OID 18793)
-- Name: umowa fkg2mebxh1null86mayg72ybuf5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.umowa
    ADD CONSTRAINT fkg2mebxh1null86mayg72ybuf5 FOREIGN KEY (osoba_id) REFERENCES public.osoba(osoba_id);


--
-- TOC entry 4773 (class 2606 OID 18783)
-- Name: platnosc fkgh5l1lh4tlyg4t5npwvm0d3lg; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platnosc
    ADD CONSTRAINT fkgh5l1lh4tlyg4t5npwvm0d3lg FOREIGN KEY (zadanie_id) REFERENCES public.zadanie(zadanie_id);


--
-- TOC entry 4769 (class 2606 OID 18758)
-- Name: cennik fkgjcxa0i2ntycy6wyt3kb4n2pn; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cennik
    ADD CONSTRAINT fkgjcxa0i2ntycy6wyt3kb4n2pn FOREIGN KEY (mieszkanie_id) REFERENCES public.mieszkanie(mieszkanie_id);


--
-- TOC entry 4778 (class 2606 OID 18803)
-- Name: zadanie fkj81s5t9jw3p4s6l2coejl065v; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zadanie
    ADD CONSTRAINT fkj81s5t9jw3p4s6l2coejl065v FOREIGN KEY (zgloszenie_id) REFERENCES public.zgloszenie(zgloszenie_id);


--
-- TOC entry 4774 (class 2606 OID 18778)
-- Name: platnosc fkjfomsw9ublamnaw1q1tiu3di6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platnosc
    ADD CONSTRAINT fkjfomsw9ublamnaw1q1tiu3di6 FOREIGN KEY (umowa_id) REFERENCES public.umowa(umowa_id);


--
-- TOC entry 4780 (class 2606 OID 18808)
-- Name: zgloszenie fklobv4hrf8wqk5ag6ajjon8ghy; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenie
    ADD CONSTRAINT fklobv4hrf8wqk5ag6ajjon8ghy FOREIGN KEY (budynek_id) REFERENCES public.budynek(budynek_id);


--
-- TOC entry 4781 (class 2606 OID 18813)
-- Name: zgloszenie fkm5hb5i3mts3s0u503046nfvcy; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenie
    ADD CONSTRAINT fkm5hb5i3mts3s0u503046nfvcy FOREIGN KEY (meldunek_id) REFERENCES public.meldunek(meldunek_id);


--
-- TOC entry 4771 (class 2606 OID 18763)
-- Name: meldunek fkr277ta4cacbqp4lmcydofg3hd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meldunek
    ADD CONSTRAINT fkr277ta4cacbqp4lmcydofg3hd FOREIGN KEY (mieszkanie_id) REFERENCES public.mieszkanie(mieszkanie_id);


-- Completed on 2024-05-15 15:15:40

--
-- PostgreSQL database dump complete
--

