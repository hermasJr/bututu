import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITimesheet } from 'app/shared/model/timesheet.model';
import { getEntities } from './timesheet.reducer';

export const Timesheet = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const timesheetList = useAppSelector(state => state.timesheet.entities);
  const loading = useAppSelector(state => state.timesheet.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="timesheet-heading" data-cy="TimesheetHeading">
        <Translate contentKey="bututuApp.timesheet.home.title">Timesheets</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="bututuApp.timesheet.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/timesheet/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="bututuApp.timesheet.home.createLabel">Create new Timesheet</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {timesheetList && timesheetList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="bututuApp.timesheet.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bututuApp.timesheet.creationDate">Creation Date</Translate>
                </th>
                <th>
                  <Translate contentKey="bututuApp.timesheet.collaborator">Collaborator</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {timesheetList.map((timesheet, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/timesheet/${timesheet.id}`} color="link" size="sm">
                      {timesheet.id}
                    </Button>
                  </td>
                  <td>
                    {timesheet.creationDate ? <TextFormat type="date" value={timesheet.creationDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {timesheet.collaborator ? (
                      <Link to={`/collaborator/${timesheet.collaborator.id}`}>{timesheet.collaborator.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/timesheet/${timesheet.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/timesheet/${timesheet.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/timesheet/${timesheet.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="bututuApp.timesheet.home.notFound">No Timesheets found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Timesheet;
