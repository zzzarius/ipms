package com.github.zzzarius.ipms.service;

import com.github.zzzarius.ipms.domain.*; // for static metamodels
import com.github.zzzarius.ipms.domain.Incident;
import com.github.zzzarius.ipms.repository.IncidentRepository;
import com.github.zzzarius.ipms.service.criteria.IncidentCriteria;
import java.util.List;
import javax.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Incident} entities in the database.
 * The main input is a {@link IncidentCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Incident} or a {@link Page} of {@link Incident} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class IncidentQueryService extends QueryService<Incident> {

    private final Logger log = LoggerFactory.getLogger(IncidentQueryService.class);

    private final IncidentRepository incidentRepository;

    public IncidentQueryService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    /**
     * Return a {@link List} of {@link Incident} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Incident> findByCriteria(IncidentCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Incident> specification = createSpecification(criteria);
        return incidentRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Incident} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Incident> findByCriteria(IncidentCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Incident> specification = createSpecification(criteria);
        return incidentRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(IncidentCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Incident> specification = createSpecification(criteria);
        return incidentRepository.count(specification);
    }

    /**
     * Function to convert {@link IncidentCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Incident> createSpecification(IncidentCriteria criteria) {
        Specification<Incident> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Incident_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), Incident_.name));
            }
            if (criteria.getStartDate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getStartDate(), Incident_.startDate));
            }
            if (criteria.getPatientId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getPatientId(), root -> root.join(Incident_.patients, JoinType.LEFT).get(Patient_.id))
                    );
            }
        }
        return specification;
    }
}
