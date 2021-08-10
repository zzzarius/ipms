import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IIncident, defaultValue } from 'app/shared/model/incident.model';

const initialState: EntityState<IIncident> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/incidents';

// Actions

export const getEntities = createAsyncThunk('incident/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}cacheBuster=${new Date().getTime()}`;
  return axios.get<IIncident[]>(requestUrl);
});

export const getFilteredEntities = createAsyncThunk(
  'incident/fetch_filtered_entity_list',
  async ({ page, size, sort, idFilter, nameFilter, startDateFilter }: IQueryParams) => {
    const catcheBusterParameter = `?cacheBuster=${new Date().getTime()}`;
    const sortParameters = sort ? `&page=${page}&size=${size}&sort=${sort}` : '';
    const idFilterParameter = idFilter ? `&id.equals=${idFilter}` : '';
    const nameFilterParameter = nameFilter ? `&name.contains=${nameFilter}` : '';
    const startDateFilterParameter = startDateFilter ? `&startDate.equals=${startDateFilter}` : '';
    const requestUrl = [
      apiUrl,
      catcheBusterParameter,
      sortParameters,
      idFilterParameter,
      nameFilterParameter,
      startDateFilterParameter,
    ].join('');
    return axios.get<IIncident[]>(requestUrl);
  }
);

export const getEntity = createAsyncThunk(
  'incident/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IIncident>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'incident/create_entity',
  async (entity: IIncident, thunkAPI) => {
    const result = await axios.post<IIncident>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'incident/update_entity',
  async (entity: IIncident, thunkAPI) => {
    const result = await axios.put<IIncident>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'incident/partial_update_entity',
  async (entity: IIncident, thunkAPI) => {
    const result = await axios.patch<IIncident>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'incident/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IIncident>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const IncidentSlice = createEntitySlice({
  name: 'incident',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities, getFilteredEntities), (state, action) => {
        return {
          ...state,
          loading: false,
          entities: action.payload.data,
          totalItems: parseInt(action.payload.headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getFilteredEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = IncidentSlice.actions;

// Reducer
export default IncidentSlice.reducer;
