import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalysisResponse } from 'src/model/AnalysisResponse'

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  constructor(private http: HttpClient) { }

  analyze(paths: string[], modes: string[]): Observable<AnalysisResponse[]> {
    return new Observable<AnalysisResponse[]>(observer => {
      const payload = {
        "paths": paths,
        "modes": modes
      };

      this.http.post<AnalysisResponse[]>('http://localhost:3030/analyze', payload).subscribe(response => {
        console.log(response);
        observer.next(response);
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }
}

