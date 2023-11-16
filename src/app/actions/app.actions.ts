import { createAction, props } from '@ngrx/store';
import { AnalysisResponse } from 'src/model/AnalysisResponse';

export const loadApps = createAction('[App] Load Apps');
export const analyze = createAction('[App] Analyze', props<{ paths: string[], modes: string[] }>());
export const analyzeSuccess = createAction('[App] Analyze Success', props<{ data: AnalysisResponse[] }>());
export const analyzeFailure = createAction('[App] Analyze Failure', props<{ error: any }>());