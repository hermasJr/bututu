package br.com.hbartolomei.bututu.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.hbartolomei.bututu.IntegrationTest;
import br.com.hbartolomei.bututu.domain.ProposalItem;
import br.com.hbartolomei.bututu.repository.ProposalItemRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ProposalItemResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProposalItemResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/proposal-items";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProposalItemRepository proposalItemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProposalItemMockMvc;

    private ProposalItem proposalItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProposalItem createEntity(EntityManager em) {
        ProposalItem proposalItem = new ProposalItem().description(DEFAULT_DESCRIPTION);
        return proposalItem;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProposalItem createUpdatedEntity(EntityManager em) {
        ProposalItem proposalItem = new ProposalItem().description(UPDATED_DESCRIPTION);
        return proposalItem;
    }

    @BeforeEach
    public void initTest() {
        proposalItem = createEntity(em);
    }

    @Test
    @Transactional
    void createProposalItem() throws Exception {
        int databaseSizeBeforeCreate = proposalItemRepository.findAll().size();
        // Create the ProposalItem
        restProposalItemMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proposalItem)))
            .andExpect(status().isCreated());

        // Validate the ProposalItem in the database
        List<ProposalItem> proposalItemList = proposalItemRepository.findAll();
        assertThat(proposalItemList).hasSize(databaseSizeBeforeCreate + 1);
        ProposalItem testProposalItem = proposalItemList.get(proposalItemList.size() - 1);
        assertThat(testProposalItem.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createProposalItemWithExistingId() throws Exception {
        // Create the ProposalItem with an existing ID
        proposalItem.setId(1L);

        int databaseSizeBeforeCreate = proposalItemRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProposalItemMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proposalItem)))
            .andExpect(status().isBadRequest());

        // Validate the ProposalItem in the database
        List<ProposalItem> proposalItemList = proposalItemRepository.findAll();
        assertThat(proposalItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllProposalItems() throws Exception {
        // Initialize the database
        proposalItemRepository.saveAndFlush(proposalItem);

        // Get all the proposalItemList
        restProposalItemMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proposalItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getProposalItem() throws Exception {
        // Initialize the database
        proposalItemRepository.saveAndFlush(proposalItem);

        // Get the proposalItem
        restProposalItemMockMvc
            .perform(get(ENTITY_API_URL_ID, proposalItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(proposalItem.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingProposalItem() throws Exception {
        // Get the proposalItem
        restProposalItemMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewProposalItem() throws Exception {
        // Initialize the database
        proposalItemRepository.saveAndFlush(proposalItem);

        int databaseSizeBeforeUpdate = proposalItemRepository.findAll().size();

        // Update the proposalItem
        ProposalItem updatedProposalItem = proposalItemRepository.findById(proposalItem.getId()).get();
        // Disconnect from session so that the updates on updatedProposalItem are not directly saved in db
        em.detach(updatedProposalItem);
        updatedProposalItem.description(UPDATED_DESCRIPTION);

        restProposalItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProposalItem.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProposalItem))
            )
            .andExpect(status().isOk());

        // Validate the ProposalItem in the database
        List<ProposalItem> proposalItemList = proposalItemRepository.findAll();
        assertThat(proposalItemList).hasSize(databaseSizeBeforeUpdate);
        ProposalItem testProposalItem = proposalItemList.get(proposalItemList.size() - 1);
        assertThat(testProposalItem.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingProposalItem() throws Exception {
        int databaseSizeBeforeUpdate = proposalItemRepository.findAll().size();
        proposalItem.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProposalItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, proposalItem.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(proposalItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProposalItem in the database
        List<ProposalItem> proposalItemList = proposalItemRepository.findAll();
        assertThat(proposalItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProposalItem() throws Exception {
        int databaseSizeBeforeUpdate = proposalItemRepository.findAll().size();
        proposalItem.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProposalItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(proposalItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProposalItem in the database
        List<ProposalItem> proposalItemList = proposalItemRepository.findAll();
        assertThat(proposalItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProposalItem() throws Exception {
        int databaseSizeBeforeUpdate = proposalItemRepository.findAll().size();
        proposalItem.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProposalItemMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proposalItem)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProposalItem in the database
        List<ProposalItem> proposalItemList = proposalItemRepository.findAll();
        assertThat(proposalItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProposalItemWithPatch() throws Exception {
        // Initialize the database
        proposalItemRepository.saveAndFlush(proposalItem);

        int databaseSizeBeforeUpdate = proposalItemRepository.findAll().size();

        // Update the proposalItem using partial update
        ProposalItem partialUpdatedProposalItem = new ProposalItem();
        partialUpdatedProposalItem.setId(proposalItem.getId());

        partialUpdatedProposalItem.description(UPDATED_DESCRIPTION);

        restProposalItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProposalItem.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProposalItem))
            )
            .andExpect(status().isOk());

        // Validate the ProposalItem in the database
        List<ProposalItem> proposalItemList = proposalItemRepository.findAll();
        assertThat(proposalItemList).hasSize(databaseSizeBeforeUpdate);
        ProposalItem testProposalItem = proposalItemList.get(proposalItemList.size() - 1);
        assertThat(testProposalItem.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateProposalItemWithPatch() throws Exception {
        // Initialize the database
        proposalItemRepository.saveAndFlush(proposalItem);

        int databaseSizeBeforeUpdate = proposalItemRepository.findAll().size();

        // Update the proposalItem using partial update
        ProposalItem partialUpdatedProposalItem = new ProposalItem();
        partialUpdatedProposalItem.setId(proposalItem.getId());

        partialUpdatedProposalItem.description(UPDATED_DESCRIPTION);

        restProposalItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProposalItem.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProposalItem))
            )
            .andExpect(status().isOk());

        // Validate the ProposalItem in the database
        List<ProposalItem> proposalItemList = proposalItemRepository.findAll();
        assertThat(proposalItemList).hasSize(databaseSizeBeforeUpdate);
        ProposalItem testProposalItem = proposalItemList.get(proposalItemList.size() - 1);
        assertThat(testProposalItem.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingProposalItem() throws Exception {
        int databaseSizeBeforeUpdate = proposalItemRepository.findAll().size();
        proposalItem.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProposalItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, proposalItem.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(proposalItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProposalItem in the database
        List<ProposalItem> proposalItemList = proposalItemRepository.findAll();
        assertThat(proposalItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProposalItem() throws Exception {
        int databaseSizeBeforeUpdate = proposalItemRepository.findAll().size();
        proposalItem.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProposalItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(proposalItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProposalItem in the database
        List<ProposalItem> proposalItemList = proposalItemRepository.findAll();
        assertThat(proposalItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProposalItem() throws Exception {
        int databaseSizeBeforeUpdate = proposalItemRepository.findAll().size();
        proposalItem.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProposalItemMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(proposalItem))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProposalItem in the database
        List<ProposalItem> proposalItemList = proposalItemRepository.findAll();
        assertThat(proposalItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProposalItem() throws Exception {
        // Initialize the database
        proposalItemRepository.saveAndFlush(proposalItem);

        int databaseSizeBeforeDelete = proposalItemRepository.findAll().size();

        // Delete the proposalItem
        restProposalItemMockMvc
            .perform(delete(ENTITY_API_URL_ID, proposalItem.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProposalItem> proposalItemList = proposalItemRepository.findAll();
        assertThat(proposalItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
