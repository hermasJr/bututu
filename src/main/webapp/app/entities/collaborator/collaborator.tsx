import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICollaborator } from 'app/shared/model/collaborator.model';
import { getEntities } from './collaborator.reducer';

export const Collaborator = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const collaboratorList = useAppSelector(state => state.collaborator.entities);
  const loading = useAppSelector(state => state.collaborator.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="collaborator-heading" data-cy="CollaboratorHeading">
        <Translate contentKey="bututuApp.collaborator.home.title">Collaborators</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="bututuApp.collaborator.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/collaborator/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="bututuApp.collaborator.home.createLabel">Create new Collaborator</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {collaboratorList && collaboratorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="bututuApp.collaborator.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bututuApp.collaborator.creationDate">Creation Date</Translate>
                </th>
                <th>
                  <Translate contentKey="bututuApp.collaborator.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {collaboratorList.map((collaborator, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/collaborator/${collaborator.id}`} color="link" size="sm">
                      {collaborator.id}
                    </Button>
                  </td>
                  <td>
                    {collaborator.creationDate ? (
                      <TextFormat type="date" value={collaborator.creationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{collaborator.user ? collaborator.user.id : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/collaborator/${collaborator.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/collaborator/${collaborator.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/collaborator/${collaborator.id}/delete`}
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
              <Translate contentKey="bututuApp.collaborator.home.notFound">No Collaborators found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Collaborator;
