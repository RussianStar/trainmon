import { AnalysisResponse } from 'src/model/AnalysisResponse';

export interface AppState {
    data: AnalysisResponse[];
    loading: boolean;
    error: any;
}
