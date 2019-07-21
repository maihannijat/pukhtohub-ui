import { Component, OnInit } from '@angular/core';
import { Term } from '../../@core/models/term.model';
import { TermService } from '../../@core/services/term.service';

@Component({
    selector: 'app-term-details',
    templateUrl: './term-details.component.html',
    styleUrls: ['./term-details.component.scss']
})
export class TermDetailsComponent implements OnInit {

    term: Term;
    subscription: any;

    constructor(private termService: TermService) {
    }

    ngOnInit() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.termService.termObservable.subscribe(term => {
            this.term = term;
        });
    }

}
