package br.com.hbartolomei.bututu.repository;

import br.com.hbartolomei.bututu.domain.Proposal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Proposal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long> {}
