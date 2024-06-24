package com.s13tab.budynkibackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Główna klasa uruchamiająca aplikację.
 */
@SpringBootApplication
public class BudynkiBackendApplication {

	/**
	 * Metoda główna uruchamiająca aplikację Spring Boot.
	 *
	 * @param args argumenty wiersza poleceń
	 */
	public static void main(String[] args) {
		SpringApplication.run(BudynkiBackendApplication.class, args);
	}

}
