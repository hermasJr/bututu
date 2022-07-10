import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './collaborator.reducer';

export const CollaboratorDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const collaboratorEntity = useAppSelector(state => state.collaborator.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="collaboratorDetailsHeading">
          <Translate contentKey="bututuApp.collaborator.detail.title">Collaborator</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{collaboratorEntity.id}</dd>
          <dt>
            <span id="creationDate">
              <Translate contentKey="bututuApp.collaborator.creationDate">Creation Date</Translate>
            </span>
          </dt>
          <dd>
            {collaboratorEntity.creationDate ? (
              <TextFormat value={collaboratorEntity.creationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="bututuApp.collaborator.user">User</Translate>
          </dt>
          <dd>{collaboratorEntity.user ? collaboratorEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/collaborator" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/collaborator/${collaboratorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CollaboratorDetail;
