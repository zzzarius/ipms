package com.github.zzzarius.ipms.repository;

import com.github.zzzarius.ipms.domain.Incident;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Incident entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    @Query("select incident from Incident incident where incident.user.login = ?#{principal.preferredUsername}")
    List<Incident> findByUserIsCurrentUser();
}
