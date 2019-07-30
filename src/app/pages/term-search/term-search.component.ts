import { Component, OnInit } from '@angular/core';
import { Term } from '../../@core/models/term.model';
import { TermService } from '../../@core/services/term.service';
import { Observable } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { tap } from 'rxjs/internal/operators/tap';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { of } from 'rxjs/internal/observable/of';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-term-search',
    templateUrl: './term-search.component.html',
    styleUrls: ['./term-search.component.scss'],
    providers: [NgbTypeaheadConfig]
})
export class TermSearchComponent implements OnInit {

    terms: Term[];
    searchTerm = '';
    searching = false;
    searchFailed = false;

    constructor(private termService: TermService,
                private config: NgbTypeaheadConfig) {
        config.showHint = true;
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(1),
            distinctUntilChanged(),
            tap(() => this.searching = true),
            switchMap(term => term.length < 0 ? []
                : this.termService.getTermSuggestions(term).pipe(
                    tap(() => this.searchFailed = false),
                    catchError(() => {
                        this.searchFailed = true;
                        return of([]);
                    }))
            ),
            tap(() => this.searching = false)
        )

    formatter = (x: { term: string }) => x.term;

    selectedItem(event) {
        console.log(event.item);
        this.termService.setSelectedTerm(event.item);
    }

    ngOnInit() {
    }

}
