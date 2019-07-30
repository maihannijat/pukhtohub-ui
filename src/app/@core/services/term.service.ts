import { HttpClient } from '@angular/common/http';
import { Term } from '../models/term.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class TermService {

    private termSource = new BehaviorSubject(null);
    termObservable = this.termSource.asObservable();

    constructor(private httpClient: HttpClient) {

    }

    getAllTerms() {
        return this.httpClient.get<Term>(environment.apiUrl + 'terms');
    }

    getTermSuggestions(term) {
        if (term === '') {
            return of([]);
        }
        return this.httpClient.get<Term[]>(environment.apiUrl + 'terms/search/' + term);
    }

    setSelectedTerm(term) {
        this.termSource.next(term);
    }

    createTerm(term) {
        return this.httpClient.post<Term>(environment.apiUrl + 'terms', term);
    }

    updateTerm(term) {
        return this.httpClient.post<Term>(environment.apiUrl + 'terms', term);
    }
}
