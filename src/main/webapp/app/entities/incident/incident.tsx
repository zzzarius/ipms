import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import React, { useEffect, useState } from 'react';
import { getSortState, JhiItemCount, JhiPagination, TextFormat, Translate } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Row, Table } from 'reactstrap';
import { getEntities, getFilteredEntities } from './incident.reducer';

export const Incident = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const incidentList = useAppSelector(state => state.incident.entities);
  const loading = useAppSelector(state => state.incident.loading);
  const totalItems = useAppSelector(state => state.incident.totalItems);

  const [idFilter, setIdFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');

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
    let startDateValue = '';
    try {
      startDateValue = dayjs(startDateFilter, APP_LOCAL_DATE_FORMAT).add(1, 'day').toISOString().split('T')[0];
      // eslint-disable-next-line no-empty
    } catch (e) {}
    dispatch(
      getFilteredEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
        idFilter,
        nameFilter,
        startDateFilter: startDateValue,
      })
    );
  }, [idFilter, nameFilter, startDateFilter]);

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
      <h2 id="incident-heading" data-cy="IncidentHeading">
        <Translate contentKey="ipmsApp.incident.home.title">Incidents</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ipmsApp.incident.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ipmsApp.incident.home.createLabel">Create new Incident</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <Table responsive>
          <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="ipmsApp.incident.id">ID</Translate> <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={sort('name')}>
                <Translate contentKey="ipmsApp.incident.name">Name</Translate> <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={sort('startDate')}>
                <Translate contentKey="ipmsApp.incident.startDate">Start Date</Translate> <FontAwesomeIcon icon="sort" />
              </th>
              <th />
            </tr>
            <tr>
              <th className="filter-input">
                <Input onChange={e => setIdFilter(e.target.value)} value={idFilter} type="text" name="ipmsApp.patient.idFilter" />
              </th>
              <th className="filter-input">
                <Input onChange={e => setNameFilter(e.target.value)} value={nameFilter} type="text" name="ipmsApp.patient.nameFilter" />
              </th>
              <th className="filter-input">
                <Input
                  onChange={e => {
                    setStartDateFilter(e.target.value);
                  }}
                  value={startDateFilter}
                  type="text"
                  name="ipmsApp.patient.startDateFilterFilter"
                />
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {incidentList && incidentList.length > 0
              ? incidentList.map((incident, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <Button tag={Link} to={`${match.url}/${incident.id}`} color="link" size="sm">
                        {incident.id}
                      </Button>
                    </td>
                    <td>{incident.name}</td>
                    <td>
                      {incident.startDate ? <TextFormat type="date" value={incident.startDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${incident.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`${match.url}/${incident.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          to={`${match.url}/${incident.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                    <td colSpan={4}>
                      <div className="alert alert-warning">
                        <Translate contentKey="ipmsApp.incident.home.notFound">No Incidents found</Translate>
                      </div>
                    </td>
                  </tr>
                )}
          </tbody>
        </Table>
      </div>
      {totalItems ? (
        <div className={incidentList && incidentList.length > 0 ? '' : 'd-none'}>
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

export default Incident;
