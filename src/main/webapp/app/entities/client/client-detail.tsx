import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './client.reducer';

export const ClientDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const clientEntity = useAppSelector(state => state.client.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="clientDetailsHeading">
          <Translate contentKey="bututuApp.client.detail.title">Client</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{clientEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="bututuApp.client.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{clientEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="bututuApp.client.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{clientEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="bututuApp.client.email">Email</Translate>
            </span>
          </dt>
          <dd>{clientEntity.email}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="bututuApp.client.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{clientEntity.phoneNumber}</dd>
          <dt>
            <span id="salary">
              <Translate contentKey="bututuApp.client.salary">Salary</Translate>
            </span>
          </dt>
          <dd>{clientEntity.salary}</dd>
          <dt>
            <span id="commissionPct">
              <Translate contentKey="bututuApp.client.commissionPct">Commission Pct</Translate>
            </span>
          </dt>
          <dd>{clientEntity.commissionPct}</dd>
        </dl>
        <Button tag={Link} to="/client" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/client/${clientEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ClientDetail;
