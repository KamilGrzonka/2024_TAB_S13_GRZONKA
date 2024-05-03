CREATE TABLE Budynek 
    (
     Numer_budynku NUMERIC (28) NOT NULL , 
     Adres VARCHAR (150) NOT NULL , 
     Liczba_miejsc NUMERIC (28) NOT NULL 
    );

ALTER TABLE Budynek ADD CONSTRAINT Budynek_PK PRIMARY KEY (Numer_budynku)
;
 

CREATE TABLE Cennik 
    (
     Numer_cennika NUMERIC (28) NOT NULL , 
     Data_poczatkowa DATE NOT NULL , 
     Data_koncowa DATE NOT NULL , 
     Cena NUMERIC (28) NOT NULL , 
     Mieszkanie_Numer_mieszkania NUMERIC (28) NOT NULL 
    );

ALTER TABLE Cennik ADD CONSTRAINT Cennik_PK PRIMARY KEY (Numer_cennika)
;
 

CREATE TABLE Firma_podwykonawcza 
    (
     NIP NUMERIC (10) NOT NULL , 
     Adres VARCHAR (150) NOT NULL , 
     Nazwa VARCHAR (100) NOT NULL 
    );

ALTER TABLE Firma_podwykonawcza ADD CONSTRAINT Firma_podwykonawcza_PK PRIMARY KEY (NIP)
;
 

CREATE TABLE Meldunek 
    (
     Numer_meldunku NUMERIC (28) NOT NULL , 
     Numer_mieszkania NUMERIC (28) NOT NULL , 
     Data_meldunku DATE NOT NULL , 
     Data_wymeldowania DATE NOT NULL , 
     Status_meldunku BOOLEAN NOT NULL , 
     Mieszkanie_Numer_mieszkania NUMERIC (28) NOT NULL , 
     Osoba_PESEL NUMERIC (11) NOT NULL 
    );

ALTER TABLE Meldunek ADD CONSTRAINT Meldunek_PK PRIMARY KEY (Numer_meldunku)
;
 

CREATE TABLE Mieszkanie 
    (
     Numer_mieszkania NUMERIC (28) NOT NULL , 
     Pietro NUMERIC (28) NOT NULL , 
     Liczba_osob NUMERIC (28) NOT NULL , 
     Opis VARCHAR (32767) NOT NULL , 
     Budynek_Numer_budynku NUMERIC (28) NOT NULL 
    );

ALTER TABLE Mieszkanie ADD CONSTRAINT Mieszkanie_PK PRIMARY KEY (Numer_mieszkania)
;
 

CREATE TABLE Osoba 
    (
     PESEL NUMERIC (11) NOT NULL , 
     Imie_i_nazwisko VARCHAR (80) NOT NULL , 
     Najmujacy BOOLEAN NOT NULL 
    );

ALTER TABLE Osoba ADD CONSTRAINT Osoba_PK PRIMARY KEY (PESEL)
;
 

CREATE TABLE Platnosc 
    (
     Numer_platnosci NUMERIC (28) NOT NULL , 
     Data_naliczenia DATE NOT NULL , 
     Data_zrealizowania DATE NOT NULL , 
     Zrealizowana BOOLEAN NOT NULL , 
     Naleznosc NUMERIC (28) NOT NULL , 
     Umowa_Numer_umowy NUMERIC (28) , 
     Zadanie_Numer_zadania NUMERIC (28) 
    );
ALTER TABLE Platnosc 
    ADD CONSTRAINT Arc_2 CHECK ( 
        (  (Umowa_Numer_umowy IS NOT NULL) AND 
         (Zadanie_Numer_zadania IS NULL) ) OR 
        (  (Zadanie_Numer_zadania IS NOT NULL) AND 
         (Umowa_Numer_umowy IS NULL) ) OR  
        (  (Umowa_Numer_umowy IS NULL)  AND 
         (Zadanie_Numer_zadania IS NULL) )  ) 
;

ALTER TABLE Platnosc ADD CONSTRAINT Platnosc_PK PRIMARY KEY (Numer_platnosci)
;
 

CREATE TABLE Umowa 
    (
     Numer_umowy NUMERIC (28) NOT NULL , 
     Data_zawarcia DATE NOT NULL , 
     Osoba_PESEL NUMERIC (11) NOT NULL , 
     Cennik_Numer_cennika NUMERIC (28) NOT NULL 
    );

    


CREATE UNIQUE INDEX 
    Umowa__IDX ON Umowa 
    ( 
     Cennik_Numer_cennika 
    ); 
 

ALTER TABLE Umowa ADD CONSTRAINT Umowa_PK PRIMARY KEY (Numer_umowy)
;
 

CREATE TABLE Zadanie 
    (
     Numer_zadania NUMERIC (28) NOT NULL , 
     Koszt NUMERIC (28) NOT NULL , 
     Opis VARCHAR (32767) NOT NULL , 
     Data_rozpoczecia DATE NOT NULL , 
     Data_zakonczenia DATE NOT NULL , 
     Firma_podwykonawcza_NIP NUMERIC (10) , 
     Zgloszenie_Numer_zgloszenia NUMERIC (28) NOT NULL 
    );

ALTER TABLE Zadanie ADD CONSTRAINT Zadanie_PK PRIMARY KEY (Numer_zadania)
;
 

CREATE TABLE Zgloszenie 
    (
     Numer_zgloszenia NUMERIC (28) NOT NULL , 
     Data_zgloszenia DATE NOT NULL , 
     Data_wykonania DATE NOT NULL , 
     Status_zgloszenia NUMERIC (1) NOT NULL , 
     Typ_zgloszenia NUMERIC (1) NOT NULL , 
     Koszt_calkowity NUMERIC (28) NOT NULL , 
     Priorytet NUMERIC (28) NOT NULL , 
     Meldunek_Numer_meldunku NUMERIC (28) , 
     Mieszkanie_Numer_mieszkania NUMERIC (28) , 
     Budynek_Numer_budynku NUMERIC (28) 
    );
ALTER TABLE Zgloszenie 
    ADD CONSTRAINT Arc_5 CHECK ( 
        (  (Budynek_Numer_budynku IS NOT NULL) AND 
         (Mieszkanie_Numer_mieszkania IS NULL) ) OR 
        (  (Mieszkanie_Numer_mieszkania IS NOT NULL) AND 
         (Budynek_Numer_budynku IS NULL) ) OR  
        (  (Budynek_Numer_budynku IS NULL)  AND 
         (Mieszkanie_Numer_mieszkania IS NULL) )  ) 
;

ALTER TABLE Zgloszenie ADD CONSTRAINT Zgloszenie_PK PRIMARY KEY (Numer_zgloszenia)
;
 

ALTER TABLE Cennik 
    ADD CONSTRAINT Cennik_Mieszkanie_FK FOREIGN KEY 
    ( 
     Mieszkanie_Numer_mieszkania
    ) 
    REFERENCES Mieszkanie 
    ( 
     Numer_mieszkania 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE Meldunek 
    ADD CONSTRAINT Meldunek_Mieszkanie_FK FOREIGN KEY 
    ( 
     Mieszkanie_Numer_mieszkania
    ) 
    REFERENCES Mieszkanie 
    ( 
     Numer_mieszkania 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE Meldunek 
    ADD CONSTRAINT Meldunek_Osoba_FK FOREIGN KEY 
    ( 
     Osoba_PESEL
    ) 
    REFERENCES Osoba 
    ( 
     PESEL 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE Mieszkanie 
    ADD CONSTRAINT Mieszkanie_Budynek_FK FOREIGN KEY 
    ( 
     Budynek_Numer_budynku
    ) 
    REFERENCES Budynek 
    ( 
     Numer_budynku 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE Platnosc 
    ADD CONSTRAINT Platnosc_Umowa_FK FOREIGN KEY 
    ( 
     Umowa_Numer_umowy
    ) 
    REFERENCES Umowa 
    ( 
     Numer_umowy 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE Platnosc 
    ADD CONSTRAINT Platnosc_Zadanie_FK FOREIGN KEY 
    ( 
     Zadanie_Numer_zadania
    ) 
    REFERENCES Zadanie 
    ( 
     Numer_zadania 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE Umowa 
    ADD CONSTRAINT Umowa_Cennik_FK FOREIGN KEY 
    ( 
     Cennik_Numer_cennika
    ) 
    REFERENCES Cennik 
    ( 
     Numer_cennika 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE Umowa 
    ADD CONSTRAINT Umowa_Osoba_FK FOREIGN KEY 
    ( 
     Osoba_PESEL
    ) 
    REFERENCES Osoba 
    ( 
     PESEL 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE Zadanie 
    ADD CONSTRAINT Zadanie_Firma_podwykonawcza_FK FOREIGN KEY 
    ( 
     Firma_podwykonawcza_NIP
    ) 
    REFERENCES Firma_podwykonawcza 
    ( 
     NIP 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE Zadanie 
    ADD CONSTRAINT Zadanie_Zgloszenie_FK FOREIGN KEY 
    ( 
     Zgloszenie_Numer_zgloszenia
    ) 
    REFERENCES Zgloszenie 
    ( 
     Numer_zgloszenia 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE Zgloszenie 
    ADD CONSTRAINT Zgloszenie_Budynek_FK FOREIGN KEY 
    ( 
     Budynek_Numer_budynku
    ) 
    REFERENCES Budynek 
    ( 
     Numer_budynku 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE Zgloszenie 
    ADD CONSTRAINT Zgloszenie_Meldunek_FK FOREIGN KEY 
    ( 
     Meldunek_Numer_meldunku
    ) 
    REFERENCES Meldunek 
    ( 
     Numer_meldunku 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE Zgloszenie 
    ADD CONSTRAINT Zgloszenie_Mieszkanie_FK FOREIGN KEY 
    ( 
     Mieszkanie_Numer_mieszkania
    ) 
    REFERENCES Mieszkanie 
    ( 
     Numer_mieszkania 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 