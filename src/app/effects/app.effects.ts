import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AnalysisService } from '../services/analysis.services';
import * as appActions from '../actions/app.actions';

import { of } from 'rxjs';

@Injectable()
export class AppEffects {
    analyze$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.analyze),
        mergeMap(action => this.analysisService.analyze(action.paths, action.modes)
          .pipe(
            map(data => appActions.analyzeSuccess({ data: data })),
            catchError(error => of(appActions.analyzeFailure({ error: error })))
          ))
        )
      );
  constructor(
    private actions$: Actions,
    private analysisService: AnalysisService
  ) {}
}