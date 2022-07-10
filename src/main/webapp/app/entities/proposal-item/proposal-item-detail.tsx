import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './proposal-item.reducer';

export const ProposalItemDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const proposalItemEntity = useAppSelector(state => state.proposalItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="proposalItemDetailsHeading">
          <Translate contentKey="bututuApp.proposalItem.detail.title">ProposalItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{proposalItemEntity.id}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="bututuApp.proposalItem.description">Description</Translate>
            </span>
          </dt>
          <dd>{proposalItemEntity.description}</dd>
          <dt>
            <Translate contentKey="bututuApp.proposalItem.proposal">Proposal</Translate>
          </dt>
          <dd>{proposalItemEntity.proposal ? proposalItemEntity.proposal.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/proposal-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/proposal-item/${proposalItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProposalItemDetail;
