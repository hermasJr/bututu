import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITicket } from 'app/shared/model/ticket.model';
import { getEntities } from './ticket.reducer';

export const Ticket = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const ticketList = useAppSelector(state => state.ticket.entities);
  const loading = useAppSelector(state => state.ticket.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="ticket-heading" data-cy="TicketHeading">
        <Translate contentKey="bututuApp.ticket.home.title">Tickets</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="bututuApp.ticket.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/ticket/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="bututuApp.ticket.home.createLabel">Create new Ticket</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {ticketList && ticketList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="bututuApp.ticket.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bututuApp.ticket.subject">Subject</Translate>
                </th>
                <th>
                  <Translate contentKey="bututuApp.ticket.creationDate">Creation Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ticketList.map((ticket, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/ticket/${ticket.id}`} color="link" size="sm">
                      {ticket.id}
                    </Button>
                  </td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.creationDate ? <TextFormat type="date" value={ticket.creationDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/ticket/${ticket.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/ticket/${ticket.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/ticket/${ticket.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="bututuApp.ticket.home.notFound">No Tickets found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Ticket;
