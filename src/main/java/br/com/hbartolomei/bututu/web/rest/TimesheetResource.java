package br.com.hbartolomei.bututu.web.rest;

import br.com.hbartolomei.bututu.domain.Timesheet;
import br.com.hbartolomei.bututu.repository.TimesheetRepository;
import br.com.hbartolomei.bututu.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link br.com.hbartolomei.bututu.domain.Timesheet}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TimesheetResource {

    private final Logger log = LoggerFactory.getLogger(TimesheetResource.class);

    private static final String ENTITY_NAME = "timesheet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TimesheetRepository timesheetRepository;

    public TimesheetResource(TimesheetRepository timesheetRepository) {
        this.timesheetRepository = timesheetRepository;
    }

    /**
     * {@code POST  /timesheets} : Create a new timesheet.
     *
     * @param timesheet the timesheet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new timesheet, or with status {@code 400 (Bad Request)} if the timesheet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/timesheets")
    public ResponseEntity<Timesheet> createTimesheet(@RequestBody Timesheet timesheet) throws URISyntaxException {
        log.debug("REST request to save Timesheet : {}", timesheet);
        if (timesheet.getId() != null) {
            throw new BadRequestAlertException("A new timesheet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Timesheet result = timesheetRepository.save(timesheet);
        return ResponseEntity
            .created(new URI("/api/timesheets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /timesheets/:id} : Updates an existing timesheet.
     *
     * @param id the id of the timesheet to save.
     * @param timesheet the timesheet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated timesheet,
     * or with status {@code 400 (Bad Request)} if the timesheet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the timesheet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/timesheets/{id}")
    public ResponseEntity<Timesheet> updateTimesheet(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Timesheet timesheet
    ) throws URISyntaxException {
        log.debug("REST request to update Timesheet : {}, {}", id, timesheet);
        if (timesheet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, timesheet.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!timesheetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Timesheet result = timesheetRepository.save(timesheet);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, timesheet.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /timesheets/:id} : Partial updates given fields of an existing timesheet, field will ignore if it is null
     *
     * @param id the id of the timesheet to save.
     * @param timesheet the timesheet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated timesheet,
     * or with status {@code 400 (Bad Request)} if the timesheet is not valid,
     * or with status {@code 404 (Not Found)} if the timesheet is not found,
     * or with status {@code 500 (Internal Server Error)} if the timesheet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/timesheets/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Timesheet> partialUpdateTimesheet(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Timesheet timesheet
    ) throws URISyntaxException {
        log.debug("REST request to partial update Timesheet partially : {}, {}", id, timesheet);
        if (timesheet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, timesheet.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!timesheetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Timesheet> result = timesheetRepository
            .findById(timesheet.getId())
            .map(existingTimesheet -> {
                if (timesheet.getCreationDate() != null) {
                    existingTimesheet.setCreationDate(timesheet.getCreationDate());
                }

                return existingTimesheet;
            })
            .map(timesheetRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, timesheet.getId().toString())
        );
    }

    /**
     * {@code GET  /timesheets} : get all the timesheets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of timesheets in body.
     */
    @GetMapping("/timesheets")
    public List<Timesheet> getAllTimesheets() {
        log.debug("REST request to get all Timesheets");
        return timesheetRepository.findAll();
    }

    /**
     * {@code GET  /timesheets/:id} : get the "id" timesheet.
     *
     * @param id the id of the timesheet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the timesheet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/timesheets/{id}")
    public ResponseEntity<Timesheet> getTimesheet(@PathVariable Long id) {
        log.debug("REST request to get Timesheet : {}", id);
        Optional<Timesheet> timesheet = timesheetRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(timesheet);
    }

    /**
     * {@code DELETE  /timesheets/:id} : delete the "id" timesheet.
     *
     * @param id the id of the timesheet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/timesheets/{id}")
    public ResponseEntity<Void> deleteTimesheet(@PathVariable Long id) {
        log.debug("REST request to delete Timesheet : {}", id);
        timesheetRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
