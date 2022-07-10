package br.com.hbartolomei.bututu.repository;

import br.com.hbartolomei.bututu.domain.Timesheet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Timesheet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TimesheetRepository extends JpaRepository<Timesheet, Long> {}
