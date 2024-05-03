# Readme
## Przydatne linki
Spring boot dokumentacja\
https://docs.spring.io/spring-framework/reference/

React dokumentacja\
https://react.dev/

Typescript\
https://www.w3schools.com/typescript/

React router\
https://reactrouter.com/en/main

Tworzenie formularzy:\
https://react-hook-form.com/\
oraz\
https://ui.shadcn.com/docs/components/form

Fetchowanie danych:\
https://tanstack.com/query/latest/docs/framework/react/reference/useQuery\
oraz\
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

Tailwind informacje o klasach z css\
https://tailwindcss.com/

Shadcn komponenty z przykładami użycia\
https://ui.shadcn.com/docs/components

Ikony\
https://lucide.dev/icons/

Testowanie requestów\
https://www.postman.com/

# Instalacja

## Postgresql
Trzeba zainstalować postgresa\
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

Jeżeli chodzi o loginy i hasła to jak gdzieś trzeba było wpisać to podawałem "postgres".

W pgAdmin 4 trzeba połączyć się z serwerem, utworzyć nową bazę danych "budynki-database", z zaznaczoną bazą z menu Tools wybrać Query Tool, wkleić tam zawartość [skryptu ddl](./dokumentacja/budynki-database.ddl) i kliknąć Execute script (f5).

## Pnpm
Jeżeli ktoś ma zainstalowane nvm albo node to najlepiej odinstalować najpierw (możliwe że zadziała wam ze zwykłym npm ale ja miałem problem przy shadcn).

Na stronie pnpm jest instrukcja instalacji:\
https://pnpm.io/installation

Dla widnowsa w powershellu trzeba wpisać\
`iwr https://get.pnpm.io/install.ps1 -useb | iex`

Następnie po otworzeniu nowej konsoli (nie w lokalizacji system32) należy wpisać\
`pnpm env use --global latest`\
(lub lts albo konkretną wersję node)

## Java
Do springa potrzebna jest Java17 (chyba może być nowsza ale bezpieczniej będzie jak wszyscy mamy tą samą). Tu przykładowo link do javy ze strony oracla:\
https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.exe

## Projekt Spring Boot
Polecam [InteliJ](https://www.jetbrains.com/idea/download) (wersja ultimate dla studenta lub community niżej na stronie) albo VSCode z [dodatkami](https://code.visualstudio.com/docs/java/java-spring-boot).

## Projekt React (Vite)
Polecam VSCode.\
W lokalizacji projektu należy wpisać polecenie w terminalu\
`pnpm install`\
Uruchamianie projektu to polecenie\
`run dev`\
lub jeżeli ktoś chce otworzyć serwer w sieci lokalnej to\
`run dev --host`

## Ustawienia VSCode
Bardzo przydatne dodatki:

https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss

VSCode bardzo lubi importować elementy z radix-ui zamiast shadcn, polecam dodać do settings.json (kliknąć prawym w edytorze > command palette > wyszukać settings.json > ustawienia dla workspace) taką linijkę
`"typescript.preferences.autoImportFileExcludePatterns": ["@radix-ui"]`

Jeżeli komuś będzie podkreślało importy z tailwinda w index.css to w tym pliku trzeba kliknąć prawym > command palette > change language mode > wybrać tailwinda

Po ustawieniu wszystkiego zresetować edytor (mi np nie wyświetlało informacji o klasach w tailwindzie do restartu)