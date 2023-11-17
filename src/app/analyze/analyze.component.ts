import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { analyze } from '../actions/app.actions';
import { AppState } from '../state/app.state';

import { Overview } from 'src/model/overview';
import { AnalysisResponse } from 'src/model/AnalysisResponse';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  input_path: string = "";
  analysis_paths: string[] = [ "C:\\Users\\TilmanRuß\\Garmin\\10093217294_ACTIVITY.fit",
  "C:\\Users\\TilmanRuß\\Garmin\\10124468420_ACTIVITY.fit"];
  modeOptions: any[] = ["workout","heart_rate", "power", "lactate"];;
  selectedMode: string[] = []; 
  tempInput: string = "";
  filteredOptions: string[] = [];
  data: Overview[] = [];
  loading: boolean = false;


  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select((state: any) => state.app.data).subscribe((data: AnalysisResponse[]) => {
      this.data = data.map(item => 
        item.results[0].Overview)
        .filter(Boolean) as Overview[];
      this.loading = false;
    });

  }

  parseAnalysisPaths(event: any): void {
    this.analysis_paths = this.input_path.split('\n');
}

  handleChipAddition(): void {
    if (this.modeOptions.includes(this.tempInput)) {
        this.selectedMode.push(this.tempInput);
        this.tempInput = ''; // Reset the temporary input
    } else {
        this.tempInput = ''; // Reset the temporary input
    }
}
filterOptions(event: any): void { // use 'any' to bypass type checking
  let query = event.query;
  this.filteredOptions = this.modeOptions.filter(option => 
      option.toLowerCase().startsWith(query.toLowerCase())
  );
}


  onAdd(event: any) {
    if (this.modeOptions.includes(event.item)) {
      console.log('Added:', event.item);
      this.selectedMode.push(event.item);
    } else {
      console.log('Invalid mode:', event.item);
    }
  }

  onRemove(event: any) {
    console.log('Removed:', event.item);
    const index = this.selectedMode.indexOf(event.item);
    if (index > -1) {
      this.selectedMode.splice(index, 1);
    }
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
    this.store.dispatch(analyze({ paths: this.analysis_paths, modes: this.selectedMode }));
  }

  loadData() {
    this.loading = true;
    this.analyze();
  }
}