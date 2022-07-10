package br.com.hbartolomei.bututu.web.rest;

import br.com.hbartolomei.bututu.domain.ProposalItem;
import br.com.hbartolomei.bututu.repository.ProposalItemRepository;
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
 * REST controller for managing {@link br.com.hbartolomei.bututu.domain.ProposalItem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProposalItemResource {

    private final Logger log = LoggerFactory.getLogger(ProposalItemResource.class);

    private static final String ENTITY_NAME = "proposalItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProposalItemRepository proposalItemRepository;

    public ProposalItemResource(ProposalItemRepository proposalItemRepository) {
        this.proposalItemRepository = proposalItemRepository;
    }

    /**
     * {@code POST  /proposal-items} : Create a new proposalItem.
     *
     * @param proposalItem the proposalItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proposalItem, or with status {@code 400 (Bad Request)} if the proposalItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/proposal-items")
    public ResponseEntity<ProposalItem> createProposalItem(@RequestBody ProposalItem proposalItem) throws URISyntaxException {
        log.debug("REST request to save ProposalItem : {}", proposalItem);
        if (proposalItem.getId() != null) {
            throw new BadRequestAlertException("A new proposalItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProposalItem result = proposalItemRepository.save(proposalItem);
        return ResponseEntity
            .created(new URI("/api/proposal-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /proposal-items/:id} : Updates an existing proposalItem.
     *
     * @param id the id of the proposalItem to save.
     * @param proposalItem the proposalItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proposalItem,
     * or with status {@code 400 (Bad Request)} if the proposalItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proposalItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/proposal-items/{id}")
    public ResponseEntity<ProposalItem> updateProposalItem(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ProposalItem proposalItem
    ) throws URISyntaxException {
        log.debug("REST request to update ProposalItem : {}, {}", id, proposalItem);
        if (proposalItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, proposalItem.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proposalItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProposalItem result = proposalItemRepository.save(proposalItem);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, proposalItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /proposal-items/:id} : Partial updates given fields of an existing proposalItem, field will ignore if it is null
     *
     * @param id the id of the proposalItem to save.
     * @param proposalItem the proposalItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proposalItem,
     * or with status {@code 400 (Bad Request)} if the proposalItem is not valid,
     * or with status {@code 404 (Not Found)} if the proposalItem is not found,
     * or with status {@code 500 (Internal Server Error)} if the proposalItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/proposal-items/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProposalItem> partialUpdateProposalItem(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ProposalItem proposalItem
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProposalItem partially : {}, {}", id, proposalItem);
        if (proposalItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, proposalItem.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proposalItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProposalItem> result = proposalItemRepository
            .findById(proposalItem.getId())
            .map(existingProposalItem -> {
                if (proposalItem.getDescription() != null) {
                    existingProposalItem.setDescription(proposalItem.getDescription());
                }

                return existingProposalItem;
            })
            .map(proposalItemRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, proposalItem.getId().toString())
        );
    }

    /**
     * {@code GET  /proposal-items} : get all the proposalItems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of proposalItems in body.
     */
    @GetMapping("/proposal-items")
    public List<ProposalItem> getAllProposalItems() {
        log.debug("REST request to get all ProposalItems");
        return proposalItemRepository.findAll();
    }

    /**
     * {@code GET  /proposal-items/:id} : get the "id" proposalItem.
     *
     * @param id the id of the proposalItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proposalItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/proposal-items/{id}")
    public ResponseEntity<ProposalItem> getProposalItem(@PathVariable Long id) {
        log.debug("REST request to get ProposalItem : {}", id);
        Optional<ProposalItem> proposalItem = proposalItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(proposalItem);
    }

    /**
     * {@code DELETE  /proposal-items/:id} : delete the "id" proposalItem.
     *
     * @param id the id of the proposalItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/proposal-items/{id}")
    public ResponseEntity<Void> deleteProposalItem(@PathVariable Long id) {
        log.debug("REST request to delete ProposalItem : {}", id);
        proposalItemRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
