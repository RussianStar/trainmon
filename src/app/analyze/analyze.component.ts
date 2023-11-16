import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { analyze } from '../actions/app.actions';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  analysis_path: string = "";
  modes: string[] = ["workout","heart_rate"];
  data: any[] = [];
  loading: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select((state: AppState) => state).subscribe((appState: AppState) => {
      this.data = appState.data;
    });
  }

  analyze() {
    this.store.dispatch(analyze({ paths: [this.analysis_path], modes: this.modes }));
  }

  loadData() {
    this.loading = true;
    this.analyze();
    this.loading = false;
  }
}
