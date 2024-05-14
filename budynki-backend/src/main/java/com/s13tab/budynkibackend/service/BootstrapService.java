package com.s13tab.budynkibackend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

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
        // tu dodawać wpisy do bazy
    }

}
