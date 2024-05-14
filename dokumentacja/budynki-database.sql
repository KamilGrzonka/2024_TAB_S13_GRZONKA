CREATE TABLE IF NOT EXISTS public.budynek
(
    liczba_miejsc integer NOT NULL,
    numer_budynku character varying(5) COLLATE pg_catalog."default" NOT NULL,
    kod_pocztowy character varying(6) COLLATE pg_catalog."default" NOT NULL,
    budynek_id bigint NOT NULL DEFAULT nextval('budynek_budynek_id_seq'::regclass),
    miasto character varying(80) COLLATE pg_catalog."default" NOT NULL,
    ulica character varying(80) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT budynek_pkey PRIMARY KEY (budynek_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.budynek
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.cennik
(
    cena numeric(10,2) NOT NULL,
    data_koncowa date NOT NULL,
    data_poczatkowa date NOT NULL,
    cennik_id bigint NOT NULL DEFAULT nextval('cennik_cennik_id_seq'::regclass),
    mieszkanie_id bigint NOT NULL,
    CONSTRAINT cennik_pkey PRIMARY KEY (cennik_id),
    CONSTRAINT fkgjcxa0i2ntycy6wyt3kb4n2pn FOREIGN KEY (mieszkanie_id)
        REFERENCES public.mieszkanie (mieszkanie_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cennik
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.firma_podwykonawcza
(
    numer_budynku character varying(5) COLLATE pg_catalog."default" NOT NULL,
    numer_lokalu character varying(5) COLLATE pg_catalog."default",
    kod_pocztowy character varying(6) COLLATE pg_catalog."default" NOT NULL,
    firma_podwykonawcza_id bigint NOT NULL DEFAULT nextval('firma_podwykonawcza_firma_podwykonawcza_id_seq'::regclass),
    nip character varying(10) COLLATE pg_catalog."default" NOT NULL,
    miasto character varying(80) COLLATE pg_catalog."default" NOT NULL,
    ulica character varying(80) COLLATE pg_catalog."default" NOT NULL,
    nazwa character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT firma_podwykonawcza_pkey PRIMARY KEY (firma_podwykonawcza_id),
    CONSTRAINT firma_podwykonawcza_nip_key UNIQUE (nip)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.firma_podwykonawcza
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.meldunek
(
    data_meldunku date NOT NULL,
    data_wymeldowania date,
    meldunek_id bigint NOT NULL DEFAULT nextval('meldunek_meldunek_id_seq'::regclass),
    mieszkanie_id bigint NOT NULL,
    osoba_id bigint NOT NULL,
    CONSTRAINT meldunek_pkey PRIMARY KEY (meldunek_id),
    CONSTRAINT fk90c3y55djifqi04mc253r93fw FOREIGN KEY (osoba_id)
        REFERENCES public.osoba (osoba_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkr277ta4cacbqp4lmcydofg3hd FOREIGN KEY (mieszkanie_id)
        REFERENCES public.mieszkanie (mieszkanie_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.meldunek
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.mieszkanie
(
    liczba_mieszkancow smallint NOT NULL,
    numer_mieszkania integer NOT NULL,
    pietro smallint NOT NULL,
    budynek_id bigint NOT NULL,
    mieszkanie_id bigint NOT NULL DEFAULT nextval('mieszkanie_mieszkanie_id_seq'::regclass),
    opis character varying(65535) COLLATE pg_catalog."default",
    CONSTRAINT mieszkanie_pkey PRIMARY KEY (mieszkanie_id),
    CONSTRAINT fk6y028d19vsg44qcjcaui30t92 FOREIGN KEY (budynek_id)
        REFERENCES public.budynek (budynek_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.mieszkanie
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.osoba
(
    osoba_id bigint NOT NULL DEFAULT nextval('osoba_osoba_id_seq'::regclass),
    pesel character varying(11) COLLATE pg_catalog."default" NOT NULL,
    imie character varying(40) COLLATE pg_catalog."default" NOT NULL,
    nazwisko character varying(40) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT osoba_pkey PRIMARY KEY (osoba_id),
    CONSTRAINT osoba_pesel_key UNIQUE (pesel)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.osoba
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.platnosc
(
    data_zrealizowania date NOT NULL,
    wartosc numeric(10,2) NOT NULL,
    platnosc_id bigint NOT NULL DEFAULT nextval('platnosc_platnosc_id_seq'::regclass),
    umowa_id bigint,
    zadanie_id bigint,
    CONSTRAINT platnosc_pkey PRIMARY KEY (platnosc_id),
    CONSTRAINT fkgh5l1lh4tlyg4t5npwvm0d3lg FOREIGN KEY (zadanie_id)
        REFERENCES public.zadanie (zadanie_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkjfomsw9ublamnaw1q1tiu3di6 FOREIGN KEY (umowa_id)
        REFERENCES public.umowa (umowa_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.platnosc
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.umowa
(
    data_zawarcia date NOT NULL,
    cennik_id bigint NOT NULL,
    osoba_id bigint NOT NULL,
    umowa_id bigint NOT NULL DEFAULT nextval('umowa_umowa_id_seq'::regclass),
    CONSTRAINT umowa_pkey PRIMARY KEY (umowa_id),
    CONSTRAINT fk953ovkdysrlynsdngjejs5qnu FOREIGN KEY (cennik_id)
        REFERENCES public.cennik (cennik_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkg2mebxh1null86mayg72ybuf5 FOREIGN KEY (osoba_id)
        REFERENCES public.osoba (osoba_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.umowa
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.zadanie
(
    data_rozpoczecia date NOT NULL,
    data_zakonczenia date,
    koszt numeric(10,2) NOT NULL,
    firma_podwykonawcza_id bigint,
    zadanie_id bigint NOT NULL DEFAULT nextval('zadanie_zadanie_id_seq'::regclass),
    zgloszenie_id bigint NOT NULL,
    opis character varying(65535) COLLATE pg_catalog."default",
    CONSTRAINT zadanie_pkey PRIMARY KEY (zadanie_id),
    CONSTRAINT fk1ysygm278qtdf49qf2ti1p05f FOREIGN KEY (firma_podwykonawcza_id)
        REFERENCES public.firma_podwykonawcza (firma_podwykonawcza_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkj81s5t9jw3p4s6l2coejl065v FOREIGN KEY (zgloszenie_id)
        REFERENCES public.zgloszenie (zgloszenie_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.zadanie
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.zgloszenie
(
    data_wykonania date,
    data_zgloszenia date NOT NULL,
    koszt_calkowity numeric(10,2),
    priorytet smallint NOT NULL,
    budynek_id bigint,
    meldunek_id bigint,
    mieszkanie_id bigint,
    zgloszenie_id bigint NOT NULL DEFAULT nextval('zgloszenie_zgloszenie_id_seq'::regclass),
    status_zgloszenia character varying(255) COLLATE pg_catalog."default" NOT NULL,
    typ_zgloszenia character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT zgloszenie_pkey PRIMARY KEY (zgloszenie_id),
    CONSTRAINT fke0q0gv7tjroc7can7gwelb3sx FOREIGN KEY (mieszkanie_id)
        REFERENCES public.mieszkanie (mieszkanie_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fklobv4hrf8wqk5ag6ajjon8ghy FOREIGN KEY (budynek_id)
        REFERENCES public.budynek (budynek_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkm5hb5i3mts3s0u503046nfvcy FOREIGN KEY (meldunek_id)
        REFERENCES public.meldunek (meldunek_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT zgloszenie_status_zgloszenia_check CHECK (status_zgloszenia::text = ANY (ARRAY['ZGLOSZONE'::character varying, 'W_TRAKCIE'::character varying, 'ZAKONCZONE'::character varying]::text[])),
    CONSTRAINT zgloszenie_typ_zgloszenia_check CHECK (typ_zgloszenia::text = ANY (ARRAY['REMONT'::character varying, 'USTERKA'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.zgloszenie
    OWNER to postgres;