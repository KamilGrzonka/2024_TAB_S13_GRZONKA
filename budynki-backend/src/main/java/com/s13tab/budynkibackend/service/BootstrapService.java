package com.s13tab.budynkibackend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.sql.Date;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import com.s13tab.budynkibackend.model.Budynek;
import com.s13tab.budynkibackend.model.Cennik;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.model.Osoba;

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
                || meldunekService.count() != 0 || mieszkanieService.count() != 0 || osobaService.count() != 0
                || platnoscService.count() != 0 || umowaService.count() != 0 || zadanieService.count() != 0
                || zgloszenieService.count() != 0) {
            return;
        }
        log.info("Populating database");
        // tu dodawać wpisy do bazy
        budynekService.save(new Budynek(null, "Zwycięstwa", "3", "44-100", "Gliwice", 12, null, null));
        budynekService.save(new Budynek(null, "Mickiewicza", "8A", "44-003", "Katowice", 20, null, null));
        budynekService.save(new Budynek(null, "Główna", "53", "30-001", "Kraków", 16, null, null));

        mieszkanieService.save(new Mieszkanie(null, 1, (short) 0, (short) 3, "Mieszkanie z łazienką i dwoma pokojami.",
                budynekService.findById(1), null, null, null));
        mieszkanieService.save(new Mieszkanie(null, 101, (short) 1, (short) 1,
                "Mieszkanie z łazienką, dwoma pokojami i balkonem.", budynekService.findById(1), null, null, null));
        mieszkanieService.save(new Mieszkanie(null, 1, (short) 0, (short) 4,
                "Mieszkanie dla studentów, łazienka, cztery pokoje, korytarz.", budynekService.findById(2), null, null,
                null));
        mieszkanieService.save(
                new Mieszkanie(null, 2, (short) 0, (short) 1, null, budynekService.findById(2), null, null, null));

        cennikService.save(new Cennik(null, new Date(1716422400000L), new Date(1719014400000L), new BigDecimal(1807.23),
                mieszkanieService.findById(1)));
        cennikService.save(new Cennik(null, new Date(1713830400000L), new Date(1716422400000L), new BigDecimal(1653.86),
                mieszkanieService.findById(1)));
        cennikService.save(new Cennik(null, new Date(1716422400000L), new Date(1719014400000L), new BigDecimal(1530.47),
                mieszkanieService.findById(2)));
        cennikService.save(new Cennik(null, new Date(1716422400000L), new Date(1719014400000L), new BigDecimal(1530.47),
                mieszkanieService.findById(3)));

        osobaService.save(new Osoba(null, "12345678901", "Krzysztof", "Kowalski", null, null));
        osobaService.save(new Osoba(null, "10987654321", "Andrzej", "Nowak", null, null));
        osobaService.save(new Osoba(null, "65432110987", "Dariusz", "Lewandowski", null, null));
        osobaService.save(new Osoba(null, "65498732110", "Grzegoż", "Wójcik", null, null));

        meldunekService.save(new Meldunek(null, new Date(1716422400000L), new Date(1719014400000L),
                osobaService.findById(1), mieszkanieService.findById(1), null));
        meldunekService.save(new Meldunek(null, new Date(1716422400000L), null, osobaService.findById(2),
                mieszkanieService.findById(1), null));
        meldunekService.save(new Meldunek(null, new Date(1716422400000L), new Date(1719014400000L),
                osobaService.findById(3), mieszkanieService.findById(2), null));
        meldunekService.save(new Meldunek(null, new Date(1716422400000L), new Date(1719014400000L),
                osobaService.findById(4), mieszkanieService.findById(3), null));

    }

}
