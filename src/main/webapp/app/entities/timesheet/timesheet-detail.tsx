import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './timesheet.reducer';

export const TimesheetDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const timesheetEntity = useAppSelector(state => state.timesheet.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="timesheetDetailsHeading">
          <Translate contentKey="bututuApp.timesheet.detail.title">Timesheet</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{timesheetEntity.id}</dd>
          <dt>
            <span id="creationDate">
              <Translate contentKey="bututuApp.timesheet.creationDate">Creation Date</Translate>
            </span>
          </dt>
          <dd>
            {timesheetEntity.creationDate ? <TextFormat value={timesheetEntity.creationDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="bututuApp.timesheet.collaborator">Collaborator</Translate>
          </dt>
          <dd>{timesheetEntity.collaborator ? timesheetEntity.collaborator.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/timesheet" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/timesheet/${timesheetEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TimesheetDetail;
