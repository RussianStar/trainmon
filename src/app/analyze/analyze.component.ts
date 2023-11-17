import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { analyze } from '../actions/app.actions';
import { AppState } from '../state/app.state';

import { Overview } from 'src/model/overview';
import { AnalysisResponse } from 'src/model/AnalysisResponse';
import { AnalysisOption } from "./model/types";
import { enumFromStringValue } from "./util";

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  input_path: string = "";
  analysis_paths: string[] = [ "C:\\Users\\TilmanRuß\\Garmin\\10093217294_ACTIVITY.fit",
  "C:\\Users\\TilmanRuß\\Garmin\\10124468420_ACTIVITY.fit"];
  modeOptions = Object.values(AnalysisOption)
  selectedMode = [AnalysisOption.WORKOUT];
  tempInput: string = "";
  filteredOptions: AnalysisOption[] = [];
  data: Overview[] = [];
  loading: boolean = false;


  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select((state: any) => state.app.data).subscribe((data: AnalysisResponse[]) => {
      if (data && data.length > 0) {
        this.data = data.map(item =>
          item.results && item.results.length > 0 ? item.results[0].Overview : null)
          .filter(Boolean) as Overview[];
      } else {
        this.data = [];
      }
      this.loading = false;
    });

  }

  parseAnalysisPaths(event: any): void {
    this.analysis_paths = this.input_path.split('\n');
}

  handleChipAddition(): void {
    const optionFromInput = enumFromStringValue(AnalysisOption, this.tempInput)
    if (optionFromInput && this.modeOptions.includes(optionFromInput)) {
      this.selectedMode.push(optionFromInput);
    }
    this.tempInput = ''; // Reset the temporary input
}
filterOptions(event: any): void { // use 'any' to bypass type checking
  let query = event.query;
  this.filteredOptions = this.modeOptions.filter(option =>
      option.toLowerCase().startsWith(query.toLowerCase())
  );
}

getSuggestionsWithoutSelected() : AnalysisOption[] {
    return Object.values(AnalysisOption).filter(option => !this.selectedMode.includes(option))
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

  protected readonly Object = Object;
  protected readonly AnalysisOption = AnalysisOption;
}
