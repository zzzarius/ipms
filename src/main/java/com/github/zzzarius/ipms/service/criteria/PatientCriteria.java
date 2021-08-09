package com.github.zzzarius.ipms.service.criteria;

import com.github.zzzarius.ipms.domain.enumeration.Category;
import java.io.Serializable;
import java.util.Objects;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.github.zzzarius.ipms.domain.Patient} entity. This class is used
 * in {@link com.github.zzzarius.ipms.web.rest.PatientResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /patients?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PatientCriteria implements Serializable, Criteria {

    /**
     * Class for filtering Category
     */
    public static class CategoryFilter extends Filter<Category> {

        public CategoryFilter() {}

        public CategoryFilter(CategoryFilter filter) {
            super(filter);
        }

        @Override
        public CategoryFilter copy() {
            return new CategoryFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter firstName;

    private StringFilter lastName;

    private CategoryFilter triageCategory;

    private LongFilter incidentId;

    private StringFilter incidentName;

    public PatientCriteria() {}

    public PatientCriteria(PatientCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.firstName = other.firstName == null ? null : other.firstName.copy();
        this.lastName = other.lastName == null ? null : other.lastName.copy();
        this.triageCategory = other.triageCategory == null ? null : other.triageCategory.copy();
        this.incidentId = other.incidentId == null ? null : other.incidentId.copy();
        this.incidentName = other.incidentName == null ? null : other.incidentName.copy();
    }

    @Override
    public PatientCriteria copy() {
        return new PatientCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getFirstName() {
        return firstName;
    }

    public StringFilter firstName() {
        if (firstName == null) {
            firstName = new StringFilter();
        }
        return firstName;
    }

    public void setFirstName(StringFilter firstName) {
        this.firstName = firstName;
    }

    public StringFilter getLastName() {
        return lastName;
    }

    public StringFilter lastName() {
        if (lastName == null) {
            lastName = new StringFilter();
        }
        return lastName;
    }

    public void setLastName(StringFilter lastName) {
        this.lastName = lastName;
    }

    public CategoryFilter getTriageCategory() {
        return triageCategory;
    }

    public CategoryFilter triageCategory() {
        if (triageCategory == null) {
            triageCategory = new CategoryFilter();
        }
        return triageCategory;
    }

    public void setTriageCategory(CategoryFilter triageCategory) {
        this.triageCategory = triageCategory;
    }

    public LongFilter getIncidentId() {
        return incidentId;
    }

    public LongFilter incidentId() {
        if (incidentId == null) {
            incidentId = new LongFilter();
        }
        return incidentId;
    }

    public void setIncidentId(LongFilter incidentId) {
        this.incidentId = incidentId;
    }

    public StringFilter getIncidentName() {
        return incidentName;
    }

    public StringFilter incidentName() {
        if (incidentName == null) {
            incidentName = new StringFilter();
        }
        return incidentName;
    }

    public void setIncidentName(StringFilter incidentName) {
        this.incidentName = incidentName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PatientCriteria that = (PatientCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(firstName, that.firstName) &&
            Objects.equals(lastName, that.lastName) &&
            Objects.equals(triageCategory, that.triageCategory) &&
            Objects.equals(incidentId, that.incidentId) &&
            Objects.equals(incidentName, that.incidentName)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, triageCategory, incidentId, incidentName);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PatientCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (firstName != null ? "firstName=" + firstName + ", " : "") +
            (lastName != null ? "lastName=" + lastName + ", " : "") +
            (triageCategory != null ? "triageCategory=" + triageCategory + ", " : "") +
            (incidentId != null ? "incidentId=" + incidentId + ", " : "") +
            (incidentName != null ? "incidentName=" + incidentName + ", " : "") +
            "}";
    }
}
