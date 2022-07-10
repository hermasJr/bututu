import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './proposal.reducer';

export const ProposalDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const proposalEntity = useAppSelector(state => state.proposal.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="proposalDetailsHeading">
          <Translate contentKey="bututuApp.proposal.detail.title">Proposal</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{proposalEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="bututuApp.proposal.name">Name</Translate>
            </span>
          </dt>
          <dd>{proposalEntity.name}</dd>
          <dt>
            <span id="creationDate">
              <Translate contentKey="bututuApp.proposal.creationDate">Creation Date</Translate>
            </span>
          </dt>
          <dd>
            {proposalEntity.creationDate ? <TextFormat value={proposalEntity.creationDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="codProposal">
              <Translate contentKey="bututuApp.proposal.codProposal">Cod Proposal</Translate>
            </span>
          </dt>
          <dd>{proposalEntity.codProposal}</dd>
        </dl>
        <Button tag={Link} to="/proposal" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/proposal/${proposalEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProposalDetail;
