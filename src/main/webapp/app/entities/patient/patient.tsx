import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import React, { ChangeEventHandler, useEffect, useState, useRef } from 'react';
import { getSortState, JhiItemCount, JhiPagination, Translate } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Input, Row, Table } from 'reactstrap';
import { getEntities, getFilteredEntities } from './patient.reducer';

export const Patient = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const patientList = useAppSelector(state => state.patient.entities);
  const loading = useAppSelector(state => state.patient.loading);
  const totalItems = useAppSelector(state => state.patient.totalItems);

  const [idFilter, setIdFilter] = useState('');
  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilte] = useState('');
  const [triageCategoryFilter, setTriageCategoryFilter] = useState('');
  const [incidentFilter, setIncidentFilter] = useState('');

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getFilteredEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
        idFilter,
        firstNameFilter,
        lastNameFilter,
        triageCategoryFilter,
        incidentFilter,
      })
    );
  }, [idFilter, firstNameFilter, lastNameFilter, triageCategoryFilter, incidentFilter]);

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { match } = props;

  return (
    <div>
      <h2 id="patient-heading" data-cy="PatientHeading">
        <Translate contentKey="ipmsApp.patient.home.title">Patients</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ipmsApp.patient.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ipmsApp.patient.home.createLabel">Create new Patient</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <Table responsive>
          <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="ipmsApp.patient.id">ID</Translate> <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={sort('firstName')}>
                <Translate contentKey="ipmsApp.patient.firstName">First Name</Translate> <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={sort('lastName')}>
                <Translate contentKey="ipmsApp.patient.lastName">Last Name</Translate> <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={sort('triageCategory')}>
                <Translate contentKey="ipmsApp.patient.triageCategory">
                  <FontAwesomeIcon icon="flag" /> Triage Category
                </Translate>{' '}
                <FontAwesomeIcon icon="sort" />
              </th>
              <th>
                <Translate contentKey="ipmsApp.patient.incident">Incident</Translate> <FontAwesomeIcon icon="sort" />
              </th>
              <th />
            </tr>
            <tr>
              <th className="filter-input">
                <Input onChange={e => setIdFilter(e.target.value)} value={idFilter} type="text" name="ipmsApp.patient.idFilter" />
              </th>
              <th className="filter-input">
                <Input
                  onChange={e => setFirstNameFilter(e.target.value)}
                  value={firstNameFilter}
                  type="text"
                  name="ipmsApp.patient.firstNameFilter"
                />
              </th>
              <th className="filter-input">
                <Input
                  onChange={e => setLastNameFilte(e.target.value)}
                  value={lastNameFilter}
                  type="text"
                  name="ipmsApp.patient.lastNameFilter"
                />
              </th>
              <th className="filter-input">
                <Input
                  onChange={e => setTriageCategoryFilter(e.target.value)}
                  value={triageCategoryFilter}
                  type="text"
                  name="ipmsApp.patient.triageCategoryFilter"
                />
              </th>
              <th className="filter-input">
                <Input
                  onChange={e => setIncidentFilter(e.target.value)}
                  value={incidentFilter}
                  type="text"
                  name="ipmsApp.patient.incidentFilter"
                />
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {patientList && patientList.length > 0
              ? patientList.map((patient, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <Button tag={Link} to={`${match.url}/${patient.id}`} color="link" size="sm">
                        {patient.id}
                      </Button>
                    </td>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td style={{ color: patient.triageCategory }}>
                      {patient?.triageCategory && <FontAwesomeIcon icon="flag" />}{' '}
                      <Translate contentKey={`ipmsApp.Category.${patient.triageCategory}`} />
                    </td>
                    <td>{patient.incident ? <Link to={`incident/${patient.incident.id}`}>{patient.incident.name}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${patient.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`${match.url}/${patient.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                          color="primary"
                          size="sm"
                          data-cy="entityEditButton"
                        >
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`${match.url}/${patient.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                          color="danger"
                          size="sm"
                          data-cy="entityDeleteButton"
                        >
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              : !loading && (
                  <tr>
                    <td colSpan={6}>
                      <div className="alert alert-warning">
                        <Translate contentKey="ipmsApp.patient.home.notFound">No Patients found</Translate>
                      </div>
                    </td>
                  </tr>
                )}
          </tbody>
        </Table>
      </div>
      {totalItems ? (
        <div className={patientList && patientList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Patient;
