import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './incident.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const IncidentDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const incidentEntity = useAppSelector(state => state.incident.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="incidentDetailsHeading">
          <Translate contentKey="ipmsApp.incident.detail.title">Incident</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{incidentEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="ipmsApp.incident.name">Name</Translate>
            </span>
          </dt>
          <dd>{incidentEntity.name}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="ipmsApp.incident.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>{incidentEntity.startDate ? <TextFormat value={incidentEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="ipmsApp.incident.user">User</Translate>
          </dt>
          <dd>{incidentEntity.user ? incidentEntity.user.login : ''}</dd>
          <dt>
            <Translate contentKey="ipmsApp.incident.patient">Patient</Translate>
          </dt>
          <dd>{incidentEntity.patient ? incidentEntity.patient.lastName : ''}</dd>
        </dl>
        <Button tag={Link} to="/incident" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/incident/${incidentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default IncidentDetail;
