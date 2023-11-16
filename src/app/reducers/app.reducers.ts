import { createReducer, on, ActionReducerMap} from '@ngrx/store';
import { loadApps, analyze, analyzeSuccess, analyzeFailure } from '../actions/app.actions';
import { AppState } from '../state/app.state';

export const initialState: AppState = {
    data: [],
    loading: false,
    error: null
  };

export const appReducer = createReducer(
  initialState,
  on(loadApps, (state: AppState) => state),
  on(analyze, (state: AppState) => ({ ...state, loading: true })),
  on(analyzeSuccess, (state: AppState, { data }: { data: any[] }) => ({ ...state, data, loading: false })),
  on(analyzeFailure, (state: AppState, { error }: { error: Error }) => ({ ...state, error, loading: false }))
);
