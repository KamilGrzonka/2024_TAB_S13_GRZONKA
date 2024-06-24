package com.s13tab.budynkibackend.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.dto.BudynekZyskDTO;
import com.s13tab.budynkibackend.dto.ZaleglaPlatnoscDTO;
import com.s13tab.budynkibackend.enums.Status;
import com.s13tab.budynkibackend.model.Budynek;
import com.s13tab.budynkibackend.model.Cennik;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.model.Platnosc;
import com.s13tab.budynkibackend.model.Zadanie;
import com.s13tab.budynkibackend.model.Zgloszenie;
import com.s13tab.budynkibackend.repository.BudynekRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

/**
 * Usługa obsługująca operacje na budynkach.
 */
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BudynekService {

    private final BudynekRepository budynekRepository;

    private final MeldunekService meldunekService;
    private final ZadanieService zadanieService;

    /**
     * Metoda znajdująca budynek o podanym identyfikatorze.
     *
     * @param id Identyfikator budynku.
     * @return Znaleziony obiekt klasy Budynek.
     * @throws EntityNotFoundException Jeśli budynek o podanym identyfikatorze nie istnieje.
     */
    public Budynek findById(long id) {
        return budynekRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Metoda zwracająca listę wszystkich budynków.
     *
     * @return Lista wszystkich budynków.
     */
    public List<Budynek> findAll() {
        return budynekRepository.findAll();
    }

    /**
     * Metoda zapisująca lub aktualizująca obiekt klasy Budynek.
     *
     * @param budynek Obiekt klasy Budynek do zapisania lub aktualizacji.
     * @return Zapisany obiekt klasy Budynek.
     */
    @Transactional
    public Budynek save(Budynek budynek) {
        return budynekRepository.save(budynek);
    }

    /**
     * Metoda zwracająca listę mieszkań przypisanych do budynku o podanym identyfikatorze.
     *
     * @param id Identyfikator budynku.
     * @return Lista mieszkań przypisanych do budynku.
     */
    public List<Mieszkanie> findMieszkaniaById(Long id) {
        return findById(id).getMieszkania();
    }

    /**
     * Metoda zwracająca listę zgłoszeń przypisanych do budynku o podanym identyfikatorze.
     *
     * @param id Identyfikator budynku.
     * @return Lista zgłoszeń przypisanych do budynku.
     */
    public List<Zgloszenie> findZgloszeniaById(Long id) {
        return findById(id).getZgloszenia();
    }

    /**
     * Metoda zwracająca listę aktywnych zgłoszeń we wszystkich budynkach.
     *
     * @return Lista aktywnych zgłoszeń.
     */
    public List<Zgloszenie> findAllActiveZgloszenia() {
        return findAll().stream().map(budynek -> budynek.getZgloszenia().stream()
                .filter(zgloszenie -> zgloszenie.getStatusZgloszenia() != Status.ZAKONCZONE)
                .collect(Collectors.toList())).flatMap(List::stream).toList();
    }

    /**
     * Metoda zwracająca listę zadań przypisanych do budynku o podanym identyfikatorze.
     *
     * @param id Identyfikator budynku.
     * @return Lista zadań przypisanych do budynku.
     */
    public List<Zadanie> findZadaniaById(Long id) {
        return findById(id).getZgloszenia().stream().map(zgloszenie -> zgloszenie.getZadania()).flatMap(List::stream)
                .toList();
    }

    /**
     * Metoda zwracająca listę płatności wychodzących przypisanych do budynku o podanym identyfikatorze.
     *
     * @param id Identyfikator budynku.
     * @return Lista płatności wychodzących przypisanych do budynku.
     */
    public List<Platnosc> findPlatnosciWychodzaceById(Long id) {
        return findZadaniaById(id).stream().map(zadanie -> zadanie.getPlatnosci())
                .flatMap(List::stream).toList();
    }

    /**
     * Metoda zwracająca listę płatności przychodzących przypisanych do mieszkań w budynku o podanym identyfikatorze.
     *
     * @param id Identyfikator budynku.
     * @return Lista płatności przychodzących przypisanych do mieszkań w budynku.
     */
    public List<Platnosc> findPlatnosciPrzychodzaceById(Long id) {
        return findMieszkaniaById(id).stream()
                .map(mieszkanie -> mieszkanie.getMeldunki()).flatMap(List::stream)
                .map(meldunek -> meldunek.getPlatnosci()).flatMap(List::stream).toList();
    }

    /**
     * Metoda zwracająca listę wszystkich płatności przypisanych do budynku o podanym identyfikatorze.
     *
     * @param id Identyfikator budynku.
     * @return Lista wszystkich płatności przypisanych do budynku.
     */
    public List<Platnosc> findPlatnosciById(Long id) {
        return Stream.concat(findPlatnosciWychodzaceById(id).stream(), findPlatnosciPrzychodzaceById(id).stream())
                .sorted(Comparator.comparing(Platnosc::getId)).collect(Collectors.toList());
    }

    /**
     * Metoda zwracająca listę meldunków przypisanych do budynku o podanym identyfikatorze.
     *
     * @param id Identyfikator budynku.
     * @return Lista meldunków przypisanych do budynku.
     */
    public List<Meldunek> findMeldunkiById(Long id) {
        List<Mieszkanie> mieszkania = findById(id).getMieszkania();
        return mieszkania.stream()
                .map(mieszkanie -> mieszkanie.getMeldunki()).flatMap(List::stream).toList();
    }

    /**
     * Metoda zwracająca listę obiektów DTO zawierających zyski dla wszystkich budynków w określonym przedziale czasowym.
     *
     * @param dataPoczatkowa Data początkowa przedziału czasowego.
     * @param dataKoncowa    Data końcowa przedziału czasowego.
     * @return Lista obiektów DTO zawierających zyski dla wszystkich budynków.
     */
    public List<BudynekZyskDTO> findAllBudynekZyskDTO(Date dataPoczatkowa, Date dataKoncowa) {
        List<Budynek> budynki = findAll();
        return budynki.stream().map(budynek -> {
            BigDecimal zysk = findPlatnosciById(budynek.getId()).stream().filter(platnosc -> {
                Date dataZrealizowania = platnosc.getDataZrealizowania();
                return dataZrealizowania.compareTo(dataPoczatkowa) >= 0
                        && dataKoncowa.compareTo(dataZrealizowania) >= 0;
            }).map(platnosc -> {
                BigDecimal wartosc = platnosc.getWartosc();
                return platnosc.getMeldunek() != null ? wartosc : wartosc.negate();
            })
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            return new BudynekZyskDTO(budynek.getId(), budynek.getUlica(), budynek.getNumerBudynku(),
                    budynek.getKodPocztowy(), budynek.getMiasto(), zysk);
        }).collect(Collectors.toList());
    }

    /**
     * Metoda pomocnicza obliczająca cenę dla danego przedziału czasowego na podstawie cenników.
     *
     * @param start   Data początkowa przedziału czasowego.
     * @param end     Data końcowa przedziału czasowego.
     * @param cenniki Lista cenników dla mieszkania.
     * @return Obliczona cena dla podanego przedziału czasowego.
     */
    private BigDecimal getPriceInRange(LocalDate start, LocalDate end, List<Cennik> cenniki) {
        BigDecimal price = BigDecimal.ZERO;
        Cennik foundCennik = cenniki.stream()
                .filter(cennik -> cennik.getDataPoczatkowa().toLocalDate().compareTo(start) <= 0
                        && cennik.getDataKoncowa().toLocalDate().compareTo(start) >= 0)
                .findFirst().orElse(null);
        if (foundCennik != null) {
            price = foundCennik.getCena();
            Period period = Period.between(start, end);
            Integer days = period.getDays();
            if (period.getMonths() == 0 && days != 0) {
                price = price.divide(new BigDecimal(30), 2, RoundingMode.HALF_UP).multiply(new BigDecimal(days));
            }

        }
        return price;
    }

    /**
     * Metoda zwracająca listę zaległych płatności przychodzących dla wszystkich meldunków w budynkach.
     *
     * @return Lista zaległych płatności przychodzących.
     */
    public List<ZaleglaPlatnoscDTO> findAllOverduePlatnosciPrzychodzace() {
        Stream<Meldunek> meldunki = meldunekService.findAll().stream().filter(meldunek -> meldunek.isWynajmujacy());
        return meldunki.map(meldunek -> {
            LocalDate dataMeldunku = meldunek.getDataMeldunku().toLocalDate();
            LocalDate dataWymeldowania = meldunek.getDataWymeldowania().toLocalDate();
            if (dataWymeldowania == null) {
                dataWymeldowania = LocalDate.now();
            }

            BigDecimal oplaconaKwota = meldunek.getPlatnosci().stream().map(platnosc -> platnosc.getWartosc())
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            List<Cennik> cenniki = meldunek.getMieszkanie().getCenniki().stream()
                    .collect(Collectors.toList());

            int daysToFifteen = 15 - dataMeldunku.getDayOfMonth();
            if (daysToFifteen < 0) {
                daysToFifteen = -daysToFifteen;
                daysToFifteen += dataMeldunku.lengthOfMonth();
            }
            LocalDate firstPayment = meldunek.getDataMeldunku().toLocalDate().plusDays(daysToFifteen);
            daysToFifteen = 15 - dataWymeldowania.getDayOfMonth();
            if (daysToFifteen < 0) {
                daysToFifteen = -daysToFifteen;
                daysToFifteen += dataWymeldowania.lengthOfMonth();
            }

            List<LocalDate> datyPlatnosci = new ArrayList<>();

            firstPayment.datesUntil(dataWymeldowania, Period.ofMonths(1)).forEach(date -> datyPlatnosci.add(date));

            List<ZaleglaPlatnoscDTO> zaleglePlatnosci = new ArrayList<>();
            if (!datyPlatnosci.get(datyPlatnosci.size() - 1).equals(dataWymeldowania)) {
                datyPlatnosci.add(dataWymeldowania);
            }
            Iterator<LocalDate> iterator = datyPlatnosci.iterator();
            while (iterator.hasNext()) {
                LocalDate date = iterator.next();
                if (date.isAfter(LocalDate.now())) {
                    iterator.remove();
                }
            }
            LocalDate lastDate = dataMeldunku;
            for (LocalDate date : datyPlatnosci) {
                if (lastDate == null) {
                    lastDate = date;
                    continue;
                }
                BigDecimal wartosc = getPriceInRange(lastDate, date, cenniki);
                if (oplaconaKwota.compareTo(BigDecimal.ZERO) > 0) {
                    BigDecimal temp = new BigDecimal(wartosc.toString());
                    wartosc = wartosc.subtract(oplaconaKwota);
                    oplaconaKwota = oplaconaKwota.subtract(temp);
                }
                if (wartosc.compareTo(BigDecimal.ZERO) > 0) {
                    Period period = Period.between(date, LocalDate.now());
                    Integer months = period.getYears() * 12 + period.getMonths();
                    zaleglePlatnosci
                            .add(new ZaleglaPlatnoscDTO(meldunek.getMieszkanie().getBudynek().getId(), wartosc, months,
                                    meldunek.getMieszkanie().getId(), meldunek.getId(), null, null));
                }
                lastDate = date;
            }
            return zaleglePlatnosci;

        }).flatMap(List::stream).toList();
    }

    /**
     * Metoda zwracająca listę zaległych płatności wychodzących dla wszystkich zadań w budynkach.
     *
     * @return Lista zaległych płatności wychodzących.
     */
    public List<ZaleglaPlatnoscDTO> findAllOverduePlatnosciWychodzace() {
        Stream<Zadanie> zadania = zadanieService.findAll().stream()
                .filter(zadanie -> zadanie.getDataZakonczenia() != null
                        && zadanie.getDataZakonczenia().toLocalDate().compareTo(LocalDate.now()) < 0);

        return zadania.map(zadanie -> {
            BigDecimal wartosc = zadanie.getKoszt().subtract(zadanie.getPlatnosci().stream()
                    .map(platnosc -> platnosc.getWartosc()).reduce(BigDecimal.ZERO, BigDecimal::add));
            Period period = Period.between(zadanie.getDataZakonczenia().toLocalDate(), LocalDate.now());
            Integer months = period.getYears() * 12 + period.getMonths();
            return new ZaleglaPlatnoscDTO(zadanie.getZgloszenie().getBudynek().getId(), wartosc, months, null, null,
                    zadanie.getZgloszenie().getId(), zadanie.getId());
        }).filter(platnosc -> platnosc.getWartosc().compareTo(BigDecimal.ZERO) > 0).collect(Collectors.toList());
    }

    /**
     * Metoda zwracająca listę wszystkich zaległych płatności (zarówno przychodzących, jak i wychodzących) w budynkach,
     * posortowanych najpierw rosnąco według liczby miesięcy opóźnienia, a następnie malejąco według wartości.
     *
     * @return Posortowana lista zaległych płatności.
     */
    public List<ZaleglaPlatnoscDTO> findAllOverduePlatnosci() {
        return Stream
                .concat(findAllOverduePlatnosciPrzychodzace().stream(), findAllOverduePlatnosciWychodzace().stream())
                .sorted(Comparator.comparing(ZaleglaPlatnoscDTO::getMiesiaceOpoznienia)
                        .thenComparing(ZaleglaPlatnoscDTO::getWartosc, Comparator.reverseOrder()))
                .collect(Collectors.toList());
    }

    /**
     * Metoda zwracająca liczbę wszystkich budynków.
     *
     * @return Liczba wszystkich budynków.
     */
    public Long count() {
        return budynekRepository.count();
    }

}
