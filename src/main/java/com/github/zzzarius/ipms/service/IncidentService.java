package com.github.zzzarius.ipms.service;

import com.github.zzzarius.ipms.domain.Incident;
import com.github.zzzarius.ipms.repository.IncidentRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Incident}.
 */
@Service
@Transactional
public class IncidentService {

    private final Logger log = LoggerFactory.getLogger(IncidentService.class);

    private final IncidentRepository incidentRepository;

    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    /**
     * Save a incident.
     *
     * @param incident the entity to save.
     * @return the persisted entity.
     */
    public Incident save(Incident incident) {
        log.debug("Request to save Incident : {}", incident);
        return incidentRepository.save(incident);
    }

    /**
     * Partially update a incident.
     *
     * @param incident the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Incident> partialUpdate(Incident incident) {
        log.debug("Request to partially update Incident : {}", incident);

        return incidentRepository
            .findById(incident.getId())
            .map(
                existingIncident -> {
                    if (incident.getName() != null) {
                        existingIncident.setName(incident.getName());
                    }
                    if (incident.getStartDate() != null) {
                        existingIncident.setStartDate(incident.getStartDate());
                    }

                    return existingIncident;
                }
            )
            .map(incidentRepository::save);
    }

    /**
     * Get all the incidents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Incident> findAll(Pageable pageable) {
        log.debug("Request to get all Incidents");
        return incidentRepository.findAll(pageable);
    }

    /**
     * Get one incident by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Incident> findOne(Long id) {
        log.debug("Request to get Incident : {}", id);
        return incidentRepository.findById(id);
    }

    /**
     * Delete the incident by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Incident : {}", id);
        incidentRepository.deleteById(id);
    }
}
