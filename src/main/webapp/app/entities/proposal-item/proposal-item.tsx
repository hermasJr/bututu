import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProposalItem } from 'app/shared/model/proposal-item.model';
import { getEntities } from './proposal-item.reducer';

export const ProposalItem = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const proposalItemList = useAppSelector(state => state.proposalItem.entities);
  const loading = useAppSelector(state => state.proposalItem.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="proposal-item-heading" data-cy="ProposalItemHeading">
        <Translate contentKey="bututuApp.proposalItem.home.title">Proposal Items</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="bututuApp.proposalItem.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/proposal-item/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="bututuApp.proposalItem.home.createLabel">Create new Proposal Item</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {proposalItemList && proposalItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="bututuApp.proposalItem.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bututuApp.proposalItem.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="bututuApp.proposalItem.proposal">Proposal</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {proposalItemList.map((proposalItem, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/proposal-item/${proposalItem.id}`} color="link" size="sm">
                      {proposalItem.id}
                    </Button>
                  </td>
                  <td>{proposalItem.description}</td>
                  <td>
                    {proposalItem.proposal ? <Link to={`/proposal/${proposalItem.proposal.id}`}>{proposalItem.proposal.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/proposal-item/${proposalItem.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/proposal-item/${proposalItem.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/proposal-item/${proposalItem.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
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
              <Translate contentKey="bututuApp.proposalItem.home.notFound">No Proposal Items found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProposalItem;
