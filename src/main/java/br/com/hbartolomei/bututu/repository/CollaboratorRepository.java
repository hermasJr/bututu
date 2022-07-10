package br.com.hbartolomei.bututu.repository;

import br.com.hbartolomei.bututu.domain.Collaborator;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Collaborator entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {}
