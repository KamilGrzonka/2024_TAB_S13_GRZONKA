--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-06-15 14:22:00

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
-- TOC entry 216 (class 1259 OID 48765)
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
-- TOC entry 215 (class 1259 OID 48764)
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
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 215
-- Name: budynek_budynek_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.budynek_budynek_id_seq OWNED BY public.budynek.budynek_id;


--
-- TOC entry 218 (class 1259 OID 48772)
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
-- TOC entry 217 (class 1259 OID 48771)
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
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 217
-- Name: cennik_cennik_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cennik_cennik_id_seq OWNED BY public.cennik.cennik_id;


--
-- TOC entry 220 (class 1259 OID 48779)
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
-- TOC entry 219 (class 1259 OID 48778)
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
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 219
-- Name: firma_podwykonawcza_firma_podwykonawcza_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.firma_podwykonawcza_firma_podwykonawcza_id_seq OWNED BY public.firma_podwykonawcza.firma_podwykonawcza_id;


--
-- TOC entry 222 (class 1259 OID 48788)
-- Name: meldunek; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meldunek (
    data_meldunku date NOT NULL,
    data_wymeldowania date,
    wynajmujacy boolean NOT NULL,
    meldunek_id bigint NOT NULL,
    mieszkanie_id bigint NOT NULL,
    osoba_id bigint NOT NULL
);


ALTER TABLE public.meldunek OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 48787)
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
-- TOC entry 4923 (class 0 OID 0)
-- Dependencies: 221
-- Name: meldunek_meldunek_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.meldunek_meldunek_id_seq OWNED BY public.meldunek.meldunek_id;


--
-- TOC entry 224 (class 1259 OID 48795)
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
-- TOC entry 223 (class 1259 OID 48794)
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
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 223
-- Name: mieszkanie_mieszkanie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mieszkanie_mieszkanie_id_seq OWNED BY public.mieszkanie.mieszkanie_id;


--
-- TOC entry 226 (class 1259 OID 48804)
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
-- TOC entry 225 (class 1259 OID 48803)
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
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 225
-- Name: osoba_osoba_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.osoba_osoba_id_seq OWNED BY public.osoba.osoba_id;


--
-- TOC entry 228 (class 1259 OID 48813)
-- Name: platnosc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.platnosc (
    data_zrealizowania date NOT NULL,
    wartosc numeric(10,2) NOT NULL,
    meldunek_id bigint,
    platnosc_id bigint NOT NULL,
    zadanie_id bigint
);


ALTER TABLE public.platnosc OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 48812)
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
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 227
-- Name: platnosc_platnosc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.platnosc_platnosc_id_seq OWNED BY public.platnosc.platnosc_id;


--
-- TOC entry 230 (class 1259 OID 48820)
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
-- TOC entry 229 (class 1259 OID 48819)
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
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 229
-- Name: zadanie_zadanie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zadanie_zadanie_id_seq OWNED BY public.zadanie.zadanie_id;


--
-- TOC entry 232 (class 1259 OID 48829)
-- Name: zgloszenie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zgloszenie (
    data_zgloszenia date NOT NULL,
    priorytet smallint NOT NULL,
    budynek_id bigint NOT NULL,
    mieszkanie_id bigint,
    osoba_id bigint,
    zgloszenie_id bigint NOT NULL,
    opis character varying(65535),
    status_zgloszenia character varying(255) NOT NULL,
    typ_zgloszenia character varying(255) NOT NULL,
    CONSTRAINT zgloszenie_status_zgloszenia_check CHECK (((status_zgloszenia)::text = ANY ((ARRAY['ZGLOSZONE'::character varying, 'W_TRAKCIE'::character varying, 'ZAKONCZONE'::character varying])::text[]))),
    CONSTRAINT zgloszenie_typ_zgloszenia_check CHECK (((typ_zgloszenia)::text = ANY ((ARRAY['REMONT'::character varying, 'USTERKA'::character varying])::text[])))
);


ALTER TABLE public.zgloszenie OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 48828)
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
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 231
-- Name: zgloszenie_zgloszenie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zgloszenie_zgloszenie_id_seq OWNED BY public.zgloszenie.zgloszenie_id;


--
-- TOC entry 4728 (class 2604 OID 48768)
-- Name: budynek budynek_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.budynek ALTER COLUMN budynek_id SET DEFAULT nextval('public.budynek_budynek_id_seq'::regclass);


--
-- TOC entry 4729 (class 2604 OID 48775)
-- Name: cennik cennik_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cennik ALTER COLUMN cennik_id SET DEFAULT nextval('public.cennik_cennik_id_seq'::regclass);


--
-- TOC entry 4730 (class 2604 OID 48782)
-- Name: firma_podwykonawcza firma_podwykonawcza_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.firma_podwykonawcza ALTER COLUMN firma_podwykonawcza_id SET DEFAULT nextval('public.firma_podwykonawcza_firma_podwykonawcza_id_seq'::regclass);


--
-- TOC entry 4731 (class 2604 OID 48791)
-- Name: meldunek meldunek_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meldunek ALTER COLUMN meldunek_id SET DEFAULT nextval('public.meldunek_meldunek_id_seq'::regclass);


--
-- TOC entry 4732 (class 2604 OID 48798)
-- Name: mieszkanie mieszkanie_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mieszkanie ALTER COLUMN mieszkanie_id SET DEFAULT nextval('public.mieszkanie_mieszkanie_id_seq'::regclass);


--
-- TOC entry 4733 (class 2604 OID 48807)
-- Name: osoba osoba_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.osoba ALTER COLUMN osoba_id SET DEFAULT nextval('public.osoba_osoba_id_seq'::regclass);


--
-- TOC entry 4734 (class 2604 OID 48816)
-- Name: platnosc platnosc_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platnosc ALTER COLUMN platnosc_id SET DEFAULT nextval('public.platnosc_platnosc_id_seq'::regclass);


--
-- TOC entry 4735 (class 2604 OID 48823)
-- Name: zadanie zadanie_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zadanie ALTER COLUMN zadanie_id SET DEFAULT nextval('public.zadanie_zadanie_id_seq'::regclass);


--
-- TOC entry 4736 (class 2604 OID 48832)
-- Name: zgloszenie zgloszenie_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenie ALTER COLUMN zgloszenie_id SET DEFAULT nextval('public.zgloszenie_zgloszenie_id_seq'::regclass);


--
-- TOC entry 4740 (class 2606 OID 48770)
-- Name: budynek budynek_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.budynek
    ADD CONSTRAINT budynek_pkey PRIMARY KEY (budynek_id);


--
-- TOC entry 4742 (class 2606 OID 48777)
-- Name: cennik cennik_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cennik
    ADD CONSTRAINT cennik_pkey PRIMARY KEY (cennik_id);


--
-- TOC entry 4744 (class 2606 OID 48786)
-- Name: firma_podwykonawcza firma_podwykonawcza_nip_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.firma_podwykonawcza
    ADD CONSTRAINT firma_podwykonawcza_nip_key UNIQUE (nip);


--
-- TOC entry 4746 (class 2606 OID 48784)
-- Name: firma_podwykonawcza firma_podwykonawcza_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.firma_podwykonawcza
    ADD CONSTRAINT firma_podwykonawcza_pkey PRIMARY KEY (firma_podwykonawcza_id);


--
-- TOC entry 4748 (class 2606 OID 48793)
-- Name: meldunek meldunek_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meldunek
    ADD CONSTRAINT meldunek_pkey PRIMARY KEY (meldunek_id);


--
-- TOC entry 4750 (class 2606 OID 48802)
-- Name: mieszkanie mieszkanie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mieszkanie
    ADD CONSTRAINT mieszkanie_pkey PRIMARY KEY (mieszkanie_id);


--
-- TOC entry 4752 (class 2606 OID 48811)
-- Name: osoba osoba_pesel_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT osoba_pesel_key UNIQUE (pesel);


--
-- TOC entry 4754 (class 2606 OID 48809)
-- Name: osoba osoba_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT osoba_pkey PRIMARY KEY (osoba_id);


--
-- TOC entry 4756 (class 2606 OID 48818)
-- Name: platnosc platnosc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platnosc
    ADD CONSTRAINT platnosc_pkey PRIMARY KEY (platnosc_id);


--
-- TOC entry 4758 (class 2606 OID 48827)
-- Name: zadanie zadanie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zadanie
    ADD CONSTRAINT zadanie_pkey PRIMARY KEY (zadanie_id);


--
-- TOC entry 4760 (class 2606 OID 48838)
-- Name: zgloszenie zgloszenie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenie
    ADD CONSTRAINT zgloszenie_pkey PRIMARY KEY (zgloszenie_id);


--
-- TOC entry 4767 (class 2606 OID 48869)
-- Name: zadanie fk1ysygm278qtdf49qf2ti1p05f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zadanie
    ADD CONSTRAINT fk1ysygm278qtdf49qf2ti1p05f FOREIGN KEY (firma_podwykonawcza_id) REFERENCES public.firma_podwykonawcza(firma_podwykonawcza_id);


--
-- TOC entry 4765 (class 2606 OID 48859)
-- Name: platnosc fk3fvy58b027d5ddfsadmrlpgsf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platnosc
    ADD CONSTRAINT fk3fvy58b027d5ddfsadmrlpgsf FOREIGN KEY (meldunek_id) REFERENCES public.meldunek(meldunek_id);


--
-- TOC entry 4764 (class 2606 OID 48854)
-- Name: mieszkanie fk6y028d19vsg44qcjcaui30t92; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mieszkanie
    ADD CONSTRAINT fk6y028d19vsg44qcjcaui30t92 FOREIGN KEY (budynek_id) REFERENCES public.budynek(budynek_id);


--
-- TOC entry 4762 (class 2606 OID 48849)
-- Name: meldunek fk90c3y55djifqi04mc253r93fw; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meldunek
    ADD CONSTRAINT fk90c3y55djifqi04mc253r93fw FOREIGN KEY (osoba_id) REFERENCES public.osoba(osoba_id);


--
-- TOC entry 4769 (class 2606 OID 48884)
-- Name: zgloszenie fke0q0gv7tjroc7can7gwelb3sx; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenie
    ADD CONSTRAINT fke0q0gv7tjroc7can7gwelb3sx FOREIGN KEY (mieszkanie_id) REFERENCES public.mieszkanie(mieszkanie_id);


--
-- TOC entry 4766 (class 2606 OID 48864)
-- Name: platnosc fkgh5l1lh4tlyg4t5npwvm0d3lg; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platnosc
    ADD CONSTRAINT fkgh5l1lh4tlyg4t5npwvm0d3lg FOREIGN KEY (zadanie_id) REFERENCES public.zadanie(zadanie_id);


--
-- TOC entry 4761 (class 2606 OID 48839)
-- Name: cennik fkgjcxa0i2ntycy6wyt3kb4n2pn; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cennik
    ADD CONSTRAINT fkgjcxa0i2ntycy6wyt3kb4n2pn FOREIGN KEY (mieszkanie_id) REFERENCES public.mieszkanie(mieszkanie_id);


--
-- TOC entry 4768 (class 2606 OID 48874)
-- Name: zadanie fkj81s5t9jw3p4s6l2coejl065v; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zadanie
    ADD CONSTRAINT fkj81s5t9jw3p4s6l2coejl065v FOREIGN KEY (zgloszenie_id) REFERENCES public.zgloszenie(zgloszenie_id);


--
-- TOC entry 4770 (class 2606 OID 48879)
-- Name: zgloszenie fklobv4hrf8wqk5ag6ajjon8ghy; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenie
    ADD CONSTRAINT fklobv4hrf8wqk5ag6ajjon8ghy FOREIGN KEY (budynek_id) REFERENCES public.budynek(budynek_id);


--
-- TOC entry 4771 (class 2606 OID 48889)
-- Name: zgloszenie fko1gq8pa6ar4qfbdi525xd985q; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenie
    ADD CONSTRAINT fko1gq8pa6ar4qfbdi525xd985q FOREIGN KEY (osoba_id) REFERENCES public.osoba(osoba_id);


--
-- TOC entry 4763 (class 2606 OID 48844)
-- Name: meldunek fkr277ta4cacbqp4lmcydofg3hd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meldunek
    ADD CONSTRAINT fkr277ta4cacbqp4lmcydofg3hd FOREIGN KEY (mieszkanie_id) REFERENCES public.mieszkanie(mieszkanie_id);


-- Completed on 2024-06-15 14:22:00

--
-- PostgreSQL database dump complete
--

