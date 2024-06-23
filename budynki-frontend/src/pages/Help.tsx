import budynek from '../assets/help/budynki.png';
import budynekdodaj from '../assets/help/budynkidodaj.png';
import mieszkania from '../assets/help/mieszkania.png';
import mieszkaniedodaj from '../assets/help/mieszkaniadodaj.png';
import mieszkanie from '../assets/help/mieszkanie.png';
import mieszkanieedytuj from '../assets/help/mieszkanieedytuj.png';
import cennik from '../assets/help/cennik.png';
import cennikdodaj from '../assets/help/cennikdodaj.png';
import cennikedytuj from '../assets/help/cennikedytuj.png';
import osoby from '../assets/help/osoby.png';
import osobadodaj from '../assets/help/osobadodaj.png';
import osobaedytuj from '../assets/help/osobaedytuj.png';
import meldunki from '../assets/help/meldunki.png';
import meldunkilista from '../assets/help/meldunkilista.png';
import meldunek from '../assets/help/meldunek.png';
import meldunekdodaj from '../assets/help/meldunekdodaj.png';
import meldunekedytuj from '../assets/help/meldunekedytuj.png';
import zgloszenia from '../assets/help/zgloszenia.png';
import zgloszenialista from '../assets/help/zgloszenialista.png';
import zgloszenie from '../assets/help/zgloszenie.png';
import zgloszeniedodaj from '../assets/help/zgloszeniedodaj.png';
import zgloszenieedytuj from '../assets/help/zgloszenieedytuj.png';
import zadania from '../assets/help/zadania.png';
import zadanie from '../assets/help/zadanie.png';
import zadaniedodaj from '../assets/help/zadaniedodaj.png';
import zadanieedytuj from '../assets/help/zadanieedytuj.png';
import firmy from '../assets/help/firmy.png';
import firma from '../assets/help/firma.png';
import firmadodaj from '../assets/help/firmadodaj.png';
import firmaedytuj from '../assets/help/firmaedytuj.png';
import firmazadania from '../assets/help/firmazadania.png';
import platnosci from '../assets/help/platnosci.png';
import platnoscilista from '../assets/help/platnoscilista.png';
import platnosc from '../assets/help/platnosc.png';
import platnoscdodaj from '../assets/help/platnoscdodaj.png';
import platnoscdodaj2 from '../assets/help/platnoscdodaj2.png';
import platnoscedytuj from '../assets/help/platnoscedytuj.png';
import raporty from '../assets/help/raporty.png';
import raportzarzadczy from '../assets/help/raportzarzadczy.png';
import raportoperacyjny from '../assets/help/raportoperacyjny.png';
import dark from '../assets/help/dark.png';

import { Box, Container, Typography } from "@mui/material";
import HelpCarousel from '@/components/HelpCarousel';

const Help = () => {

  const description_buildings = 'System został stworzony w celu ułatwienia pracy administratora budynków. Dlatego pierwszym krokiem powinno być dodanie budynku, mieszkań oraz cen ich wynajęcia. Na poniższych zrzutach przedstawiono jak poruszać się po zakładce budynków, w której można dokonać tych czynności:';

  const images_buildings = [
    { src: budynek, alt: 'Budynki', description: 'Po otworzeniu zakładki "Budynki" otworzony zostanie widok wszystkich dostępnych budynków. Z tego poziomu możliwe jest dodanie nowego budynku poprzez kliknięcie przycisku "Dodaj budynek" lub przejście do szczegółów wybranego budynku używając przycisku "Szczegóły".' },
    { src: budynekdodaj, alt: 'Dodawanie budynku', description: 'Wybranie opcji "Dodaj budynek" z poprzedniego widoku, sprawi że otworzony zostanie formularz dodawania budynku. Gdy wypełnione zostaną wszystkie wymagane pola edycyjne możliwe będzie dodanie budynku poprzez kliknięcie przycisku "Dodaj". W celu anulowania dodawania budynku kliknij "Anuluj".' },
    { src: mieszkania, alt: 'Mieszkania', description: 'Kliknięcie przycisku "Szczegóły" z widoku budynków otworzy widok wszystkich mieszkań dostępnych w danym budynku. Możliwe jest dodanie nowego mieszkania poprzez kliknięcie przycisku "Dodaj mieszkanie" lub przejście do szczegółów wybranego mieszkania klikając w odpowiednią komórkę kolumny "Szczegóły".' },
    { src: mieszkaniedodaj, alt: 'Dodawanie mieszkania', description: 'Wybranie opcji "Dodaj mieszkanie" z poprzedniego widoku, otworzy formularz dodawania mieszkania. Gdy wypełnione zostaną wszystkie wymagane pola edycyjne możliwe będzie dodanie mieszkania poprzez kliknięcie przycisku "Dodaj". Przycisk "Anuluj" przerywa akcję dodawania mieszkania i powoduje powrót do widoku mieszkań.' },
    { src: mieszkanie, alt: 'Mieszkanie', description: 'Szczegółowy widok danego mieszkania zawiera wszystkie informacje o mieszkaniu. Z jego poziomu możliwa jest edycja mieszkania poprzez opcję "Edytuj dane" oraz przejście do historii cen mieszkania po wybraniu opcji "Historia cen". Kliknięcie w symbol krzyżyka w prawym górnym rogu powoduje powrót do listy mieszkań danego budynku.' },
    { src: mieszkanieedytuj, alt: 'Edycja mieszkania', description: 'Edycja informacji o mieszkaniu jest możliwa poprzez wybranie opcji "Edytuj dane" z poprzedniego widoku. Po wprowadzeniu zmian możliwe jest zapisanie zmian przez kliknięcie przycisku "Edytuj" lub odrzucenie ich kliknięciem przycisku "Anuluj".' },
    { src: cennik, alt: 'Cennik', description: 'Widok cennika danego mieszkania przedstawia ceny mieszkania na przestrzeni czasu. Możliwe jest tutaj dodanie nowej ceny przyciskiem "Dodaj cenę" lub edytowanie istniejącej już ceny klikając w odpowiednią komórkę kolumny "Edytuj". Kliknięcie w symbol krzyżyka w prawym górnym rogu powoduje powrót do szczegółów danego mieszkania.' },
    { src: cennikdodaj, alt: 'Dodawanie cennika', description: 'Po wprowadzeniu danych w formularzu dodawania ceny mieszkania możliwe jest dodanie ceny przyciskiem "Dodaj" lub anulowanie akcji dodawania przyciskiem "Anuluj". Wybór dat jest ograniczony do dat, które jeszcze nie posiadają zarejestrowanej ceny, co powoduje, że nie możliwe jest dodanie ceny, której okres obowiązywania jest taki sam lub nachodzących z istniejącą już ceną danego mieszkania.' },
    { src: cennikedytuj, alt: 'Edycja cennika', description: 'Formularz edycji cennika umożliwia edycję istniejącej ceny. Zapisanie edycji można osiągnąć poprzez kliknięcie przycisku "Edytuj". Przycisk "Anuluj" odrzuca wprowadzone zmiany. Podobnie jak podczas dodawania system dba o spójność dat, więc nie możliwe jest edytowanie cen tak by daty ich obowiązywania nie nachodziły na siebie.' },
  ];

  const description_persons = 'Kolejnym etapem w sprawnym korzystaniu z systemu powinno być dodanie osób wynajmujących mieszkania w budynkach. W tym celu zalecane jest przejście do zakładki "Osoby", po otworzeniu której otworzony zostanie widok zarejestrowanych osób w systemie:';

  const images_persons = [
    { src: osoby, alt: 'Osoby', description: 'Z poziomu listy osób możliwe jest dodanie nowej osoby poprzez kliknięcie przycisku "Dodaj osobę" lub przejście do edycji danych danej osoby klikając w odpowiednią ikonę ołówka znajdującą się w kolumnie "Edytuj".' },
    { src: osobadodaj, alt: 'Dodawanie osoby', description: 'Wybranie opcji "Dodaj osobę" z poprzedniego widoku, sprawi że otworzony zostanie formularz dodawania budynku. Gdy wypełnione zostaną wszystkie wymagane pola edycyjne możliwe będzie dodanie osoby do systemu poprzez kliknięcie przycisku "Dodaj". W celu anulowania dodawania osoby kliknij "Anuluj".' },
    { src: osobaedytuj, alt: 'Edycja osoby', description: 'Edycja danych osobowych jest możliwa poprzez wybranie opcji kliknięcie ikony ołówka z widoku listy osób. Po wprowadzeniu zmian możliwe jest zapisanie zmian przez kliknięcie przycisku "Edytuj" lub odrzucenie ich kliknięciem przycisku "Anuluj".' },
  ];

  const description_registration = 'Po dodaniu do systemu budynków oraz osób, możliwe będzie dodawanie meldunków, co można osiągnąć poprzez przejście do zakładki "Meldunki". Aby dodać meldunek postępuj zgodnie z etapami przedstawionymi na poniższych zrzutach ekranu:';

  const images_registration = [
    { src: meldunki, alt: 'Meldunki', description: 'Po otworzeniu zakładki "Meldunki" otworzony zostanie widok wszystkich dostępnych budynków. Z tego poziomu możliwe jest przejście do listy meldunków wybranego budynku używając wybranego przycisku "Szczegóły".' },
    { src: meldunkilista, alt: 'Lista meldunków', description: 'Z poziomu listy meldunków możliwe jest dodanie nowego meldunku poprzez kliknięcie przycisku "Dodaj meldunek" lub przejście do szczegółów danego meldunku klikając w odpowiednią komórkę kolumny "Szczegóły". ' },
    { src: meldunekdodaj, alt: 'Dodawanie meldunku', description: 'Wybranie opcji "Dodaj meldunek" z poprzedniego widoku, otworzy formularz dodawania meldunku. Gdy wypełnione zostaną wszystkie wymagane pola edycyjne możliwe będzie dodanie meldunku poprzez kliknięcie przycisku "Dodaj". Przycisk "Anuluj" przerywa akcję dodawania i powoduje powrót do listy meldunków.' },
    { src: meldunek, alt: 'Meldunek', description: 'Szczegółowy widok danego meldunku zawiera wszystkie informacje na jego temat. Z jego poziomu możliwa jest edycja meldunku poprzez opcję "Edytuj meldunek" oraz przejście do danych o osobie wynajmującej klikając w jej imię i nazwisko. Możliwe jest też wyświetlenie szczegółowych danych o wynajmowanym mieszkaniu poprzez kliknięcie w numer mieszkania. Kliknięcie w symbol krzyżyka w prawym górnym rogu powoduje powrót do listy meldunków danego budynku.' },
    { src: meldunekedytuj, alt: 'Edycja meldunku', description: 'Edycja meldunku jest możliwa poprzez kliknięcie przycisku "Edytuj meldunek" ze szczegółowego widoku meldunku. Po wprowadzeniu zmian możliwe jest zapisanie zmian przez kliknięcie przycisku "Edytuj" lub odrzucenie ich kliknięciem przycisku "Anuluj".' },
  ];

  const description_repairs = 'Po dodaniu do systemu budynków oraz osób, możliwe będzie również dodawanie zgłoszeń remontów lub usterek oraz zadań składających się na dane zgłoszenie. W tym celu zalecane jest przejście do zakładki "Zgłoszenia", po otworzeniu której otworzony zostanie widok zarejestrowanych budynków w systemie:';

  const images_repairs = [
    { src: zgloszenia, alt: 'Zgłoszenia', description: 'Po otworzeniu zakładki "Zgłoszenia" otworzony zostanie widok wszystkich dostępnych budynków. Z tego poziomu możliwe jest przejście do listy zgłoszeń wybranego budynku używając wybranego przycisku "Szczegóły".' },
    { src: zgloszenialista, alt: 'Lista zgłoszeń', description: 'Z poziomu listy zgłoszeń możliwe jest dodanie nowego zgłoszenia poprzez kliknięcie przycisku "Dodaj zgłoszenie" lub przejście do szczegółów danego zgłoszenia klikając w odpowiednią komórkę kolumny "Szczegóły". ' },
    { src: zgloszeniedodaj, alt: 'Dodawanie zgłoszenia', description: 'Wybranie opcji "Dodaj zgłoszenie" z poprzedniego widoku, otworzy formularz dodawania zgłoszenia. Gdy wypełnione zostaną wszystkie wymagane pola edycyjne możliwe będzie dodanie zgłoszenia poprzez kliknięcie przycisku "Dodaj". Przycisk "Anuluj" przerywa akcję dodawania i powoduje powrót do listy zgłoszeń.' },
    { src: zgloszenie, alt: 'Zgłoszenie', description: 'Szczegółowy widok danego zgłoszenia zawiera wszystkie informacje na jego temat. Z jego poziomu możliwa jest jego edycja poprzez opcję "Edytuj zgłoszenie" oraz przejście do danych o osobie zgłaszającej klikając w jej imię i nazwisko. Możliwe jest też wyświetlenie szczegółowych danych o remontowanym mieszkaniu poprzez kliknięcie w numer mieszkania. Kliknięcie w symbol krzyżyka w prawym górnym rogu powoduje powrót do listy zgłoszeń danego budynku.' },
    { src: zgloszenieedytuj, alt: 'Edycja zgłoszenia', description: 'Edycja zgłoszenia jest możliwa poprzez kliknięcie przycisku "Edytuj zgłoszenie" ze szczegółowego widoku zgłoszenia. Po wprowadzeniu zmian możliwe jest zapisanie zmian przez kliknięcie przycisku "Edytuj" lub odrzucenie ich kliknięciem przycisku "Anuluj".' },
    { src: zadania, alt: 'Zadania', description: 'Po kliknięciu przycisku "Zadania" otworzony zostanie widok listy wszystkich zadań przypisanych do danego zgłoszenia. Z tego poziomu możliwe dodanie nowego zadania poprzez kliknięcie przycisku "Dodaj zadanie" oraz przejście do szczegółów wybranego zadania klikając w odpowiednią komórkę kolumny "Szczegóły".' },
    { src: zadaniedodaj, alt: 'Dodawanie zadania', description: 'Wybranie opcji "Dodaj zadanie" z poprzedniego widoku, otworzy formularz dodawania zadania. Gdy wypełnione zostaną wszystkie wymagane pola edycyjne możliwe będzie dodanie zadania poprzez kliknięcie przycisku "Dodaj". Przycisk "Anuluj" przerywa akcję dodawania i powoduje powrót do listy meldunków. Z tego poziomu możliwe jest przypisanie firmy podwykonawczej do zadania, jeśli jakaś firma jest już zarejestrowana w systemie. Proces dodawania firm podwykonawczych jest opisany w dalszej części.' },
    { src: zadanie, alt: 'Zadanie', description: 'Szczegółowy widok danego zadania zawiera wszystkie informacje na jego temat. Z jego poziomu możliwa jest edycja zadania poprzez opcję "Edytuj zadanie" oraz przejście do danych o firmie podwykonawczej jeśli jest przypisana do danego zadania klikając w jej dane. Kliknięcie w symbol krzyżyka w prawym górnym rogu powoduje powrót do listy meldunków danego budynku.' },
    { src: zadanieedytuj, alt: 'Edycja zadania', description: 'Edycja zadania jest możliwa poprzez kliknięcie przycisku "Edytuj zadanie" ze szczegółowego widoku zadania. Po wprowadzeniu zmian możliwe jest zapisanie zmian przez kliknięcie przycisku "Edytuj" lub odrzucenie ich kliknięciem przycisku "Anuluj". Z tego formularza jest również możliwe przypisanie firmy podwykonawczej, jeśli istnieją już jakieś firmy w systemie. Proces dodawania firmy podwykonawczej jest opisany poniżej.' },
  ];

  const description_companies = 'Po dodaniu do systemu zgłoszeń oraz poszczególnych zadań zalecane jest dodanie firm podwykonawczych, które można przypisać do zadań. W tym celu zalecane jest przejście do zakładki "Firmy", po otworzeniu której wyświetlona zostanie lista zarejestrowanych firm w systemie:';

  const images_companies = [
    { src: firmy, alt: 'Firmy', description: 'Z poziomu listy firm możliwe jest dodanie nowej firmy podwykonawczej poprzez kliknięcie przycisku "Dodaj firmę" lub przejście do szczegółów danego meldunku klikając w odpowiednią komórkę kolumny "Szczegóły".' },
    { src: firmadodaj, alt: 'Dodawanie firmy', description: 'Wybranie opcji "Dodaj firmę" z poprzedniego widoku, otworzy formularz dodawania firmy podwykonawczej. Gdy wypełnione zostaną wszystkie wymagane pola edycyjne możliwe będzie dodanie firmy poprzez kliknięcie przycisku "Dodaj". Przycisk "Anuluj" przerywa akcję dodawania i powoduje powrót do listy firm.' },
    { src: firma, alt: 'Firma', description: 'Szczegółowy widok danej firmy zawiera wszystkie informacje na jej temat. Z tego widoku możliwe jest edytowanie danych firmy po kliknięciu przycisku "Edytuj dane" oraz przejście do listy zadań przypisanych do danej firmy. Kliknięcie w symbol krzyżyka w prawym górnym rogu powoduje powrót do listy zgłoszeń danego budynku.' },
    { src: firmaedytuj, alt: 'Edycja firmy', description: 'Edycja firmy podwykonawczej jest możliwa poprzez kliknięcie przycisku "Edytuj dane" ze szczegółowego widoku firmy. Po wprowadzeniu zmian możliwe jest zapisanie zmian przez kliknięcie przycisku "Edytuj" lub odrzucenie ich kliknięciem przycisku "Anuluj".' },
    { src: firmazadania, alt: 'Zadania firmy', description: 'Wybranie opcji "Zadania" ze szczegółowego widoku firmy, otworzy listę wszystkich zadań, które są przypisane do danej firmy podwykonawczej. Możliwe jest wyświetlenie szczegółów danego zadania klikając w odpowiednią komórkę kolumny "Szczegóły".' },
  ];

  const description_payments = 'Po dodaniu do systemu zgłoszeń oraz meldunków możliwe jest dodawanie płatności przychodzących z racji meldunków oraz wychodzących z racji zadań i zgłoszeń. Aby dodać płatność postępuj zgodnie z etapami przedstawionymi na poniższych zrzutach ekranu:';

  const images_payments = [
    { src: platnosci, alt: 'Płatności', description: 'Po otworzeniu zakładki "Płatności" otworzony zostanie widok wszystkich dostępnych budynków. Z tego poziomu możliwe jest przejście do listy płatności wybranego budynku używając wybranego przycisku "Szczegóły".' },
    { src: platnoscilista, alt: 'Lista płatności', description: 'Z poziomu listy płatności możliwe jest dodanie nowej płatności przychodzącej poprzez kliknięcie przycisku "Dodaj płatność przychodzącą". Analogicznie przycisk "Dodaj płatność wychodzącą" odpowiada za przekierowanie do formularza dodawania płatności wychodzącej. Przejście do szczegółów danej płatności jest możliwe poprzez kliknięcie w odpowiednią komórkę kolumny "Szczegóły". ' },
    { src: platnoscdodaj, alt: 'Dodawanie płatności przychodzącej', description: 'Wybranie opcji "Dodaj płatność przychodząca " z poprzedniego widoku, otworzy formularz dodawania płatności przychodzącej powiązanej z meldunkiem. Gdy wypełnione zostaną wszystkie wymagane pola edycyjne możliwe będzie dodanie płatności poprzez kliknięcie przycisku "Dodaj". Przycisk "Anuluj" przerywa akcję dodawania i powoduje powrót do listy płatności.' },
    { src: platnoscdodaj2, alt: 'Dodawanie płatności wychodzącej', description: 'Wybranie opcji "Dodaj płatność wychodzącą" z widoku listy płatności, otworzy formularz dodawania płatności wychodzącej związanej z zadaniem. Gdy wypełnione zostaną wszystkie wymagane pola edycyjne możliwe będzie dodanie płatności poprzez kliknięcie przycisku "Dodaj". Przycisk "Anuluj" przerywa akcję dodawania i powoduje powrót do listy płatności.' },
    { src: platnosc, alt: 'Płatność', description: 'Szczegółowy widok danej płatności zawiera wszystkie informacje na temat danej płatności. Z tego poziomu możliwa jest edycja płatności poprzez opcję "Edytuj płatność" oraz przejście do danych o meldunku lub zadaniu w zależności od typu płatności klikając w numer meldunku lub zadania. Kliknięcie w symbol krzyżyka w prawym górnym rogu powoduje powrót do listy meldunków danego budynku.' },
    { src: platnoscedytuj, alt: 'Edycja płatności', description: 'Edycja płatności jest możliwa poprzez kliknięcie przycisku "Edytuj płatność" ze szczegółowego widoku płatności. Po wprowadzeniu zmian możliwe jest zapisanie zmian przez kliknięcie przycisku "Edytuj" lub odrzucenie ich kliknięciem przycisku "Anuluj". W zależności od typu płatności w formularzu edytowany może być meldunek lub zadanie, z którym dana płatność jest związana.' },
  ];

  const description_reports = 'Po dodaniu wszystkich pożądanych danych do systemu możliwe jest generowanie raportów zarządczych oraz operacyjnych, które pozwalają szybko podsumować wszystkie zebrane dane oraz wyselekcjonować wszystkie najcenniejsze informacje. W celu wygenerowania raportu należy udać się do zakładki "Raporty":';

  const images_reports = [
    { src: raporty, alt: 'Raporty', description: 'Po otworzeniu zakładki "Raporty" otworzony zostanie widok z dwoma polami edycyjnymi, w których należy wybrać zakres dat, z którego ma powstać raport zarządczy na podstawie danych z zadanego okresu. Po wybraniu okresu możliwe jest wygenerowanie raportu zarządczego poprzez kliknięcie przycisku "Wyświetl Raport Zarządczy". Możliwe jest również wygenerowanie raportu operacyjnego klikając przycisk "Wyświetl Raport Operacyjny".' },
    { src: raportzarzadczy, alt: 'Raport zarządczy', description: 'Wybranie opcji "Wygeneruj Raport Zarządczy" z poprzedniego widoku sprawi, że wyświetlony zostanie widok z zyskami z poszczególnych budynków w danym okresie.' },
    { src: raportoperacyjny, alt: 'Raport operacyjny', description: 'Wybranie opcji "Wygeneruj Raport Operacyjny" z początkowego widoku raportów, sprawi że wyświetlony widok z aktywnymi zgłoszeniami oraz zaległymi płatnościami z wszystkich budynków. Z tego widoku możliwe jest przejście do szczegółów wybranego zgłoszenia lub płatności poprzez kliknięcie w odpowiednią komórkę kolumny "Szczegóły" w tabeli aktywnych zgłoszeń lub zaległych płatności.' },
  ];

  const description_themes = 'System został również wyposażony w obsługę ciemnego motywu w celu zapewnienia przyjemniejszej pracy z systemem. Aby zmienić motyw kliknij w ikonę w lewym dolnym rogu, po czym wybierz interesującą cię opcję. Możliwe jest również dostosowanie motywu zgodnego z motywem systemowym. Różnicę w motywach przedstawiono na poniższych zrzutach ekranu:';

  const images_themes = [
    { src: budynek, alt: 'Jasny motyw', description: 'Wygląd systemu z włączonym jasnym motywem.' },
    { src: dark, alt: 'Ciemny motyw', description: 'Wygląd systemu z włączonym ciemnym motywem.' },
  ];

 
  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Typography variant="h3">{`Pomoc`}</Typography>
      </Box>
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h5">{`Poniżej przedstawiono jak efektywnie korzystać z systemu`}</Typography>
      </Box>
      <HelpCarousel carouselDescription={description_buildings} carouselImages={images_buildings} />
      <HelpCarousel carouselDescription={description_persons} carouselImages={images_persons} />
      <HelpCarousel carouselDescription={description_registration} carouselImages={images_registration} />
      <HelpCarousel carouselDescription={description_repairs} carouselImages={images_repairs} />
      <HelpCarousel carouselDescription={description_companies} carouselImages={images_companies} />
      <HelpCarousel carouselDescription={description_payments} carouselImages={images_payments} />
      <HelpCarousel carouselDescription={description_reports} carouselImages={images_reports} />
      <HelpCarousel carouselDescription={description_themes} carouselImages={images_themes} />
    </Container>
  )
};

export default Help;
