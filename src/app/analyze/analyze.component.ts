import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { analyze } from '../actions/app.actions';
import { AppState } from '../state/app.state';
import { AnalysisResponse } from 'src/model/AnalysisResponse';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  analysis_paths: string[] = [];
  modes: string[] = ["workout","heart_rate"];
  data: AnalysisResponse[] = [];
  loading: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select((state: AppState) => state).subscribe((appState: AppState) => {
      this.data = appState.data;
      this.loading = false;
    });
  }

  onUpload(event: any) {
    console.log('Upload event:', event);
    this.analysis_paths = event.files.map((file: File) => {
      console.log('File:', file);
      return file.name;
    });
    this.analyze();
  }

  analyze() {
    this.store.dispatch(analyze({ paths: this.analysis_paths, modes: this.modes }));
  }

  loadData() {
    this.loading = true;
    this.analyze();
  }
}
