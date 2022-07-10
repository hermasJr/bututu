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
 * A Collaborator.
 */
@Entity
@Table(name = "collaborator")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Collaborator implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "creation_date")
    private Instant creationDate;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "collaborator")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "collaborator" }, allowSetters = true)
    private Set<Timesheet> timesheets = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Collaborator id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreationDate() {
        return this.creationDate;
    }

    public Collaborator creationDate(Instant creationDate) {
        this.setCreationDate(creationDate);
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Collaborator user(User user) {
        this.setUser(user);
        return this;
    }

    public Set<Timesheet> getTimesheets() {
        return this.timesheets;
    }

    public void setTimesheets(Set<Timesheet> timesheets) {
        if (this.timesheets != null) {
            this.timesheets.forEach(i -> i.setCollaborator(null));
        }
        if (timesheets != null) {
            timesheets.forEach(i -> i.setCollaborator(this));
        }
        this.timesheets = timesheets;
    }

    public Collaborator timesheets(Set<Timesheet> timesheets) {
        this.setTimesheets(timesheets);
        return this;
    }

    public Collaborator addTimesheet(Timesheet timesheet) {
        this.timesheets.add(timesheet);
        timesheet.setCollaborator(this);
        return this;
    }

    public Collaborator removeTimesheet(Timesheet timesheet) {
        this.timesheets.remove(timesheet);
        timesheet.setCollaborator(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Collaborator)) {
            return false;
        }
        return id != null && id.equals(((Collaborator) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Collaborator{" +
            "id=" + getId() +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
