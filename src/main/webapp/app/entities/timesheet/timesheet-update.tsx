import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICollaborator } from 'app/shared/model/collaborator.model';
import { getEntities as getCollaborators } from 'app/entities/collaborator/collaborator.reducer';
import { ITimesheet } from 'app/shared/model/timesheet.model';
import { getEntity, updateEntity, createEntity, reset } from './timesheet.reducer';

export const TimesheetUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const collaborators = useAppSelector(state => state.collaborator.entities);
  const timesheetEntity = useAppSelector(state => state.timesheet.entity);
  const loading = useAppSelector(state => state.timesheet.loading);
  const updating = useAppSelector(state => state.timesheet.updating);
  const updateSuccess = useAppSelector(state => state.timesheet.updateSuccess);
  const handleClose = () => {
    props.history.push('/timesheet');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCollaborators({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.creationDate = convertDateTimeToServer(values.creationDate);

    const entity = {
      ...timesheetEntity,
      ...values,
      collaborator: collaborators.find(it => it.id.toString() === values.collaborator.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          creationDate: displayDefaultDateTime(),
        }
      : {
          ...timesheetEntity,
          creationDate: convertDateTimeFromServer(timesheetEntity.creationDate),
          collaborator: timesheetEntity?.collaborator?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="bututuApp.timesheet.home.createOrEditLabel" data-cy="TimesheetCreateUpdateHeading">
            <Translate contentKey="bututuApp.timesheet.home.createOrEditLabel">Create or edit a Timesheet</Translate>
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
                  id="timesheet-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('bututuApp.timesheet.creationDate')}
                id="timesheet-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="timesheet-collaborator"
                name="collaborator"
                data-cy="collaborator"
                label={translate('bututuApp.timesheet.collaborator')}
                type="select"
              >
                <option value="" key="0" />
                {collaborators
                  ? collaborators.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/timesheet" replace color="info">
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

export default TimesheetUpdate;
