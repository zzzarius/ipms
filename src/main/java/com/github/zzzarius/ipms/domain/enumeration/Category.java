package com.github.zzzarius.ipms.domain.enumeration;

/**
 * The Category enumeration.
 */
public enum Category {
    BLACK("Black"),
    RED("Red"),
    YELLOW("Yellow"),
    GREEN("Green");

    private final String value;

    Category(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
