package com.s13tab.budynkibackend.helper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

/**
 * Klasa obsługująca wyjątki globalnie dla wszystkich kontrolerów.
 */
@ControllerAdvice
@Slf4j
public class DefaultExceptionHandler {

    /**
     * Obsługuje wyjątek związany z nieprawidłowymi argumentami metody.
     *
     * @param e wyjątek typu MethodArgumentNotValidException
     * @return odpowiedź HTTP z odpowiednim statusem i komunikatem
     */
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        return new ResponseEntity<>("Validation failed", HttpStatus.BAD_REQUEST);
    }

    /**
     * Obsługuje wyjątek związany z brakiem znalezienia encji.
     *
     * @param e wyjątek typu EntityNotFoundException
     * @return odpowiedź HTTP z odpowiednim statusem i komunikatem
     */
    @ExceptionHandler(value = EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFoundException(EntityNotFoundException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
    }

}
