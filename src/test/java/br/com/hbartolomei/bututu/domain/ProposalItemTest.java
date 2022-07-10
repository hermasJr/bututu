package br.com.hbartolomei.bututu.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.hbartolomei.bututu.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProposalItemTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProposalItem.class);
        ProposalItem proposalItem1 = new ProposalItem();
        proposalItem1.setId(1L);
        ProposalItem proposalItem2 = new ProposalItem();
        proposalItem2.setId(proposalItem1.getId());
        assertThat(proposalItem1).isEqualTo(proposalItem2);
        proposalItem2.setId(2L);
        assertThat(proposalItem1).isNotEqualTo(proposalItem2);
        proposalItem1.setId(null);
        assertThat(proposalItem1).isNotEqualTo(proposalItem2);
    }
}
