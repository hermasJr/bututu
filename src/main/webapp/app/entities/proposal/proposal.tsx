import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProposal } from 'app/shared/model/proposal.model';
import { getEntities } from './proposal.reducer';

export const Proposal = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const proposalList = useAppSelector(state => state.proposal.entities);
  const loading = useAppSelector(state => state.proposal.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="proposal-heading" data-cy="ProposalHeading">
        <Translate contentKey="bututuApp.proposal.home.title">Proposals</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="bututuApp.proposal.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/proposal/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="bututuApp.proposal.home.createLabel">Create new Proposal</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {proposalList && proposalList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="bututuApp.proposal.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bututuApp.proposal.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="bututuApp.proposal.creationDate">Creation Date</Translate>
                </th>
                <th>
                  <Translate contentKey="bututuApp.proposal.codProposal">Cod Proposal</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {proposalList.map((proposal, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/proposal/${proposal.id}`} color="link" size="sm">
                      {proposal.id}
                    </Button>
                  </td>
                  <td>{proposal.name}</td>
                  <td>
                    {proposal.creationDate ? <TextFormat type="date" value={proposal.creationDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{proposal.codProposal}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/proposal/${proposal.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/proposal/${proposal.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/proposal/${proposal.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="bututuApp.proposal.home.notFound">No Proposals found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Proposal;
