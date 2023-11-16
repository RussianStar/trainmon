import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { analyze } from './actions/app.actions';
import { Observable } from 'rxjs';
import { AnalysisResponse } from 'src/model/AnalysisResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data$: Observable<AnalysisResponse[]>;

  constructor(private store: Store<{ data: AnalysisResponse[], loading: boolean, error: any }>) {
    this.data$ = this.store.select('data');
  }

  onAnalyze(paths: string[], modes: string[]) {
    this.store.dispatch(analyze({ paths, modes }));
  }
}