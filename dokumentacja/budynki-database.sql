CREATE TABLE budynek (
    numer_budynku SERIAL,
    adres         VARCHAR(150) NOT NULL,
    liczba_miejsc INTEGER NOT NULL
);

ALTER TABLE budynek ADD CONSTRAINT budynek_pk PRIMARY KEY ( numer_budynku );

CREATE TABLE cennik (
    numer_cennika               SERIAL,
    data_poczatkowa             DATE NOT NULL,
    data_koncowa                DATE NOT NULL,
    cena                        NUMERIC(10, 2) NOT NULL,
    mieszkanie_numer_mieszkania INTEGER NOT NULL
);

ALTER TABLE cennik ADD CONSTRAINT cennik_pk PRIMARY KEY ( numer_cennika );

CREATE TABLE firma_podwykonawcza (
    nip   NUMERIC(10) NOT NULL,
    adres VARCHAR(150) NOT NULL,
    nazwa VARCHAR(100) NOT NULL
);

ALTER TABLE firma_podwykonawcza ADD CONSTRAINT firma_podwykonawcza_pk PRIMARY KEY ( nip );

CREATE TABLE meldunek (
    numer_meldunku              SERIAL,
    data_meldunku               DATE NOT NULL,
    data_wymeldowania           DATE NOT NULL,
    status_meldunku             BOOLEAN NOT NULL,
    osoba_pesel                 NUMERIC(11) NOT NULL,
    mieszkanie_numer_mieszkania INTEGER NOT NULL
);

ALTER TABLE meldunek ADD CONSTRAINT meldunek_pk PRIMARY KEY ( numer_meldunku );

CREATE TABLE mieszkanie (
    numer_mieszkania      INTEGER NOT NULL,
    pietro                SMALLINT NOT NULL,
    liczba_osob           SMALLINT NOT NULL,
    opis                  VARCHAR(65535) NOT NULL,
    budynek_numer_budynku INTEGER NOT NULL
);

ALTER TABLE mieszkanie ADD CONSTRAINT mieszkanie_pk PRIMARY KEY ( numer_mieszkania );

CREATE TABLE osoba (
    pesel           NUMERIC(11) NOT NULL,
    imie_i_nazwisko VARCHAR(80) NOT NULL,
    najmujacy       BOOLEAN NOT NULL
);

ALTER TABLE osoba ADD CONSTRAINT osoba_pk PRIMARY KEY ( pesel );

CREATE TABLE platnosc (
    numer_platnosci       SERIAL,
    data_naliczenia       DATE NOT NULL,
    data_zrealizowania    DATE NOT NULL,
    zrealizowana          BOOLEAN NOT NULL,
    naleznosc             NUMERIC(10, 2) NOT NULL,
    zadanie_numer_zadania INTEGER,
    umowa_numer_umowy     INTEGER
);

ALTER TABLE platnosc
    ADD CONSTRAINT arc_2 CHECK ( ( ( umowa_numer_umowy IS NOT NULL )
                                   AND ( zadanie_numer_zadania IS NULL ) )
                                 OR ( ( zadanie_numer_zadania IS NOT NULL )
                                      AND ( umowa_numer_umowy IS NULL ) )
                                 OR ( ( umowa_numer_umowy IS NULL )
                                      AND ( zadanie_numer_zadania IS NULL ) ) );

ALTER TABLE platnosc ADD CONSTRAINT platnosc_pk PRIMARY KEY ( numer_platnosci );

CREATE TABLE umowa (
    numer_umowy          SERIAL,
    data_zawarcia        DATE NOT NULL,
    osoba_pesel          NUMERIC(11) NOT NULL,
    cennik_numer_cennika INTEGER NOT NULL
);

CREATE UNIQUE INDEX umowa__idx ON
    umowa (
        cennik_numer_cennika
    ASC );

ALTER TABLE umowa ADD CONSTRAINT umowa_pk PRIMARY KEY ( numer_umowy );

CREATE TABLE zadanie (
    numer_zadania               SERIAL,
    koszt                       NUMERIC(10, 2) NOT NULL,
    opis                        VARCHAR(65535) NOT NULL,
    data_rozpoczecia            DATE NOT NULL,
    data_zakonczenia            DATE NOT NULL,
    firma_podwykonawcza_nip     NUMERIC(10),
    zgloszenie_numer_zgloszenia INTEGER NOT NULL
);

ALTER TABLE zadanie ADD CONSTRAINT zadanie_pk PRIMARY KEY ( numer_zadania );

CREATE TABLE zgloszenie (
    numer_zgloszenia            SERIAL,
    data_zgloszenia             DATE NOT NULL,
    data_wykonania              DATE NOT NULL,
    status_zgloszenia           NUMERIC(1) NOT NULL,
    typ_zgloszenia              NUMERIC(1) NOT NULL,
    koszt_calkowity             DECIMAL(10, 2) NOT NULL,
    priorytet                   SMALLINT NOT NULL,
    meldunek_numer_meldunku     INTEGER,
    mieszkanie_numer_mieszkania INTEGER,
    budynek_numer_budynku       INTEGER
);

ALTER TABLE zgloszenie
    ADD CONSTRAINT arc_5 CHECK ( ( ( budynek_numer_budynku IS NOT NULL )
                                   AND ( mieszkanie_numer_mieszkania IS NULL ) )
                                 OR ( ( mieszkanie_numer_mieszkania IS NOT NULL )
                                      AND ( budynek_numer_budynku IS NULL ) )
                                 OR ( ( budynek_numer_budynku IS NULL )
                                      AND ( mieszkanie_numer_mieszkania IS NULL ) ) );

ALTER TABLE zgloszenie ADD CONSTRAINT zgloszenie_pk PRIMARY KEY ( numer_zgloszenia );

ALTER TABLE cennik
    ADD CONSTRAINT cennik_mieszkanie_fk FOREIGN KEY ( mieszkanie_numer_mieszkania )
        REFERENCES mieszkanie ( numer_mieszkania );

ALTER TABLE meldunek
    ADD CONSTRAINT meldunek_mieszkanie_fk FOREIGN KEY ( mieszkanie_numer_mieszkania )
        REFERENCES mieszkanie ( numer_mieszkania );

ALTER TABLE meldunek
    ADD CONSTRAINT meldunek_osoba_fk FOREIGN KEY ( osoba_pesel )
        REFERENCES osoba ( pesel );

ALTER TABLE mieszkanie
    ADD CONSTRAINT mieszkanie_budynek_fk FOREIGN KEY ( budynek_numer_budynku )
        REFERENCES budynek ( numer_budynku );

ALTER TABLE platnosc
    ADD CONSTRAINT platnosc_umowa_fk FOREIGN KEY ( umowa_numer_umowy )
        REFERENCES umowa ( numer_umowy );

ALTER TABLE platnosc
    ADD CONSTRAINT platnosc_zadanie_fk FOREIGN KEY ( zadanie_numer_zadania )
        REFERENCES zadanie ( numer_zadania );

ALTER TABLE umowa
    ADD CONSTRAINT umowa_cennik_fk FOREIGN KEY ( cennik_numer_cennika )
        REFERENCES cennik ( numer_cennika );

ALTER TABLE umowa
    ADD CONSTRAINT umowa_osoba_fk FOREIGN KEY ( osoba_pesel )
        REFERENCES osoba ( pesel );

ALTER TABLE zadanie
    ADD CONSTRAINT zadanie_firma_podwykonawcza_fk FOREIGN KEY ( firma_podwykonawcza_nip )
        REFERENCES firma_podwykonawcza ( nip );

ALTER TABLE zadanie
    ADD CONSTRAINT zadanie_zgloszenie_fk FOREIGN KEY ( zgloszenie_numer_zgloszenia )
        REFERENCES zgloszenie ( numer_zgloszenia );

ALTER TABLE zgloszenie
    ADD CONSTRAINT zgloszenie_budynek_fk FOREIGN KEY ( budynek_numer_budynku )
        REFERENCES budynek ( numer_budynku );

ALTER TABLE zgloszenie
    ADD CONSTRAINT zgloszenie_meldunek_fk FOREIGN KEY ( meldunek_numer_meldunku )
        REFERENCES meldunek ( numer_meldunku );

ALTER TABLE zgloszenie
    ADD CONSTRAINT zgloszenie_mieszkanie_fk FOREIGN KEY ( mieszkanie_numer_mieszkania )
        REFERENCES mieszkanie ( numer_mieszkania );
