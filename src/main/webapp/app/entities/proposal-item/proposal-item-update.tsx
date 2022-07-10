import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProposal } from 'app/shared/model/proposal.model';
import { getEntities as getProposals } from 'app/entities/proposal/proposal.reducer';
import { IProposalItem } from 'app/shared/model/proposal-item.model';
import { getEntity, updateEntity, createEntity, reset } from './proposal-item.reducer';

export const ProposalItemUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const proposals = useAppSelector(state => state.proposal.entities);
  const proposalItemEntity = useAppSelector(state => state.proposalItem.entity);
  const loading = useAppSelector(state => state.proposalItem.loading);
  const updating = useAppSelector(state => state.proposalItem.updating);
  const updateSuccess = useAppSelector(state => state.proposalItem.updateSuccess);
  const handleClose = () => {
    props.history.push('/proposal-item');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getProposals({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...proposalItemEntity,
      ...values,
      proposal: proposals.find(it => it.id.toString() === values.proposal.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...proposalItemEntity,
          proposal: proposalItemEntity?.proposal?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="bututuApp.proposalItem.home.createOrEditLabel" data-cy="ProposalItemCreateUpdateHeading">
            <Translate contentKey="bututuApp.proposalItem.home.createOrEditLabel">Create or edit a ProposalItem</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="proposal-item-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('bututuApp.proposalItem.description')}
                id="proposal-item-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                id="proposal-item-proposal"
                name="proposal"
                data-cy="proposal"
                label={translate('bututuApp.proposalItem.proposal')}
                type="select"
              >
                <option value="" key="0" />
                {proposals
                  ? proposals.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/proposal-item" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProposalItemUpdate;
