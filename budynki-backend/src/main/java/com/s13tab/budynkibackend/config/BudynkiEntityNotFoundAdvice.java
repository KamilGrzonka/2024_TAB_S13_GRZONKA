package com.s13tab.budynkibackend.config;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.s13tab.budynkibackend.exception.BudynkiEntityNotFoundException;

@ControllerAdvice
class BudynkiEntityNotFoundAdvice {

  @ResponseBody
  @ExceptionHandler(BudynkiEntityNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  String employeeNotFoundHandler(BudynkiEntityNotFoundException ex) {
    return ex.getMessage();
  }
}
