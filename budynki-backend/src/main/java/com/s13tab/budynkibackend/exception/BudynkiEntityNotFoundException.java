package com.s13tab.budynkibackend.exception;

import java.math.BigDecimal;

public class BudynkiEntityNotFoundException extends RuntimeException {
    public BudynkiEntityNotFoundException(Integer id, String entityName) {
        super("Could not find " + entityName + " " + id);
    }

    public BudynkiEntityNotFoundException(BigDecimal id, String entityName) {
        super("Could not find " + entityName + " " + id);
    }
}
