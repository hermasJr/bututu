package br.com.hbartolomei.bututu.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Proposal.
 */
@Entity
@Table(name = "proposal")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Proposal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "creation_date")
    private Instant creationDate;

    @Column(name = "cod_proposal")
    private String codProposal;

    @OneToMany(mappedBy = "proposal")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "proposal" }, allowSetters = true)
    private Set<ProposalItem> proposalItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Proposal id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Proposal name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getCreationDate() {
        return this.creationDate;
    }

    public Proposal creationDate(Instant creationDate) {
        this.setCreationDate(creationDate);
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public String getCodProposal() {
        return this.codProposal;
    }

    public Proposal codProposal(String codProposal) {
        this.setCodProposal(codProposal);
        return this;
    }

    public void setCodProposal(String codProposal) {
        this.codProposal = codProposal;
    }

    public Set<ProposalItem> getProposalItems() {
        return this.proposalItems;
    }

    public void setProposalItems(Set<ProposalItem> proposalItems) {
        if (this.proposalItems != null) {
            this.proposalItems.forEach(i -> i.setProposal(null));
        }
        if (proposalItems != null) {
            proposalItems.forEach(i -> i.setProposal(this));
        }
        this.proposalItems = proposalItems;
    }

    public Proposal proposalItems(Set<ProposalItem> proposalItems) {
        this.setProposalItems(proposalItems);
        return this;
    }

    public Proposal addProposalItem(ProposalItem proposalItem) {
        this.proposalItems.add(proposalItem);
        proposalItem.setProposal(this);
        return this;
    }

    public Proposal removeProposalItem(ProposalItem proposalItem) {
        this.proposalItems.remove(proposalItem);
        proposalItem.setProposal(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Proposal)) {
            return false;
        }
        return id != null && id.equals(((Proposal) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Proposal{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", codProposal='" + getCodProposal() + "'" +
            "}";
    }
}
