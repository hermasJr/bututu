package br.com.hbartolomei.bututu.repository;

import br.com.hbartolomei.bututu.domain.ProposalItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ProposalItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProposalItemRepository extends JpaRepository<ProposalItem, Long> {}
