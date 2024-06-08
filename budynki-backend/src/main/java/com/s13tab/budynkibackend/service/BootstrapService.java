package com.s13tab.budynkibackend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.sql.Date;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import com.s13tab.budynkibackend.enums.Status;
import com.s13tab.budynkibackend.enums.Typ;
import com.s13tab.budynkibackend.model.Budynek;
import com.s13tab.budynkibackend.model.Cennik;
import com.s13tab.budynkibackend.model.Firma;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.model.Osoba;
import com.s13tab.budynkibackend.model.Zadanie;
import com.s13tab.budynkibackend.model.Zgloszenie;

@Slf4j
@RequiredArgsConstructor
@Service
public class BootstrapService {

        private final BudynekService budynekService;

        private final CennikService cennikService;

        private final FirmaService firmaService;

        private final MeldunekService meldunekService;

        private final MieszkanieService mieszkanieService;

        private final OsobaService osobaService;

        private final PlatnoscService platnoscService;

        private final UmowaService umowaService;

        private final ZadanieService zadanieService;

        private final ZgloszenieService zgloszenieService;

        @EventListener(ApplicationReadyEvent.class)
        public void init() {
                log.info("Bootstrap start");

                populateDatabase();

                log.info("Bootstrap end");
        }

        public void populateDatabase() {
                if (budynekService.count() != 0 || cennikService.count() != 0 || firmaService.count() != 0
                                || meldunekService.count() != 0 || mieszkanieService.count() != 0
                                || osobaService.count() != 0
                                || platnoscService.count() != 0 || umowaService.count() != 0
                                || zadanieService.count() != 0
                                || zgloszenieService.count() != 0) {
                        return;
                }
                log.info("Populating database");
                // tu dodawać wpisy do bazy
                budynekService.save(new Budynek(null, "Zwycięstwa", "3", "44-100", "Gliwice", 12, null, null));
                budynekService.save(new Budynek(null, "Mickiewicza", "8A", "44-003", "Katowice", 20, null, null));
                budynekService.save(new Budynek(null, "Główna", "53", "30-001", "Kraków", 16, null, null));

                mieszkanieService.save(
                                new Mieszkanie(null, 1, (short) 0, (short) 3, "Mieszkanie z łazienką i dwoma pokojami.",
                                                budynekService.findById(1), null, null, null));
                mieszkanieService.save(new Mieszkanie(null, 101, (short) 1, (short) 1,
                                "Mieszkanie z łazienką, dwoma pokojami i balkonem.", budynekService.findById(1), null,
                                null, null));
                mieszkanieService.save(new Mieszkanie(null, 1, (short) 0, (short) 4,
                                "Mieszkanie dla studentów, łazienka, cztery pokoje, korytarz.",
                                budynekService.findById(2), null, null,
                                null));
                mieszkanieService.save(
                                new Mieszkanie(null, 2, (short) 0, (short) 1, null, budynekService.findById(2), null,
                                                null, null));

                cennikService.save(new Cennik(null, Date.valueOf("2024-04-12"), Date.valueOf("2024-05-12"),
                                new BigDecimal(1807.23),
                                mieszkanieService.findById(1)));
                cennikService.save(new Cennik(null, Date.valueOf("2024-05-13"), Date.valueOf("2024-06-13"),
                                new BigDecimal(1653.86),
                                mieszkanieService.findById(1)));
                cennikService.save(new Cennik(null, Date.valueOf("2024-02-11"), Date.valueOf("2024-04-11"),
                                new BigDecimal(1530.47),
                                mieszkanieService.findById(2)));
                cennikService.save(new Cennik(null, Date.valueOf("2024-04-15"), Date.valueOf("2024-05-15"),
                                new BigDecimal(1530.47),
                                mieszkanieService.findById(3)));

                osobaService.save(new Osoba(null, "12345678901", "Krzysztof", "Kowalski", null, null, null));
                osobaService.save(new Osoba(null, "10987654321", "Andrzej", "Nowak", null, null, null));
                osobaService.save(new Osoba(null, "65432110987", "Dariusz", "Lewandowski", null, null, null));
                osobaService.save(new Osoba(null, "65498732110", "Grzegoż", "Wójcik", null, null, null));

                meldunekService.save(new Meldunek(null, Date.valueOf("2023-05-12"), Date.valueOf("2024-05-12"), true,
                                osobaService.findById(1), mieszkanieService.findById(1)));
                meldunekService.save(
                                new Meldunek(null, Date.valueOf("2023-10-15"), null, false, osobaService.findById(2),
                                                mieszkanieService.findById(1)));
                meldunekService.save(new Meldunek(null, Date.valueOf("2023-03-15"), Date.valueOf("2024-03-15"), true,
                                osobaService.findById(3), mieszkanieService.findById(2)));
                meldunekService.save(new Meldunek(null, Date.valueOf("2023-08-06"), Date.valueOf("2024-08-06"), true,
                                osobaService.findById(4), mieszkanieService.findById(3)));

                zgloszenieService.save(new Zgloszenie(null, Date.valueOf("2023-03-11"), Date.valueOf("2023-03-12"),
                                Status.ZAKONCZONE, Typ.USTERKA, new BigDecimal(240.35), (short) 5,
                                osobaService.findById(1), mieszkanieService.findById(1),
                                budynekService.findById(1),
                                null));
                zgloszenieService.save(new Zgloszenie(null, Date.valueOf("2024-05-11"), null,
                                Status.W_TRAKCIE, Typ.REMONT, new BigDecimal(1382.23), (short) 1, null, null,
                                budynekService.findById(1),
                                null));
                zgloszenieService.save(new Zgloszenie(null, Date.valueOf("2024-05-11"), null,
                                Status.ZGLOSZONE, Typ.USTERKA, null, (short) 1, osobaService.findById(2), null,
                                budynekService.findById(2),
                                null));

                firmaService.save(new Firma(null, "Tanie Okna", "1234567890", "3 Maja", "10A", "3", "12-345", "Gliwice",
                                null));
                firmaService.save(new Firma(null, "Bob Budowniczy", "6789012345", "Akademicka", "20", null, "12-345",
                                "Gliwice", null));

                zadanieService.save(new Zadanie(null, new BigDecimal(240.35), "Wybita szyba w łazience",
                                Date.valueOf("2023-03-12"), Date.valueOf("2023-03-12"), firmaService.findById(1),
                                zgloszenieService.findById(1)));
                zadanieService.save(new Zadanie(null, new BigDecimal(307.40), "Wymiana barierek na klatce schodowej",
                                Date.valueOf("2024-05-14"), Date.valueOf("2024-06-01"), firmaService.findById(2),
                                zgloszenieService.findById(2)));
                zadanieService.save(new Zadanie(null, new BigDecimal(270.30), "Malowanie ścian na klatce schodowej",
                                Date.valueOf("2024-06-02"), Date.valueOf("2023-06-06"), firmaService.findById(2),
                                zgloszenieService.findById(2)));
                zadanieService.save(new Zadanie(null, new BigDecimal(804.63), "Wymana okien na klatce schodowej",
                                Date.valueOf("2024-06-07"), null, firmaService.findById(1),
                                zgloszenieService.findById(2)));
                zadanieService.save(new Zadanie(null, new BigDecimal(250.27), "Zacinające się drzwi wejściowe",
                                Date.valueOf("2024-06-07"), null, null, zgloszenieService.findById(3)));
        }
}
