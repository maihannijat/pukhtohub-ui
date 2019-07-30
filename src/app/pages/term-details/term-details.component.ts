import { Component, OnDestroy, OnInit } from '@angular/core';
import { Term } from '../../@core/models/term.model';
import { TermService } from '../../@core/services/term.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ORIGINS, PARTS } from '../../defaults';

@Component({
    selector: 'app-term-details',
    templateUrl: './term-details.component.html',
    styleUrls: ['./term-details.component.scss']
})
export class TermDetailsComponent implements OnInit, OnDestroy {

    term: Term;
    subscriptions: Subscription[] = [];
    form: FormGroup;
    translationFormArray: FormArray;
    exampleFormArray: FormArray;
    synonymFormArray: FormArray;
    partsSpeech = PARTS;
    origins = ORIGINS;
    loading = false;
    submitted = false;
    isAddMode = false;
    messages;
    errors;

    constructor(private termService: TermService,
                private fb: FormBuilder) {
    }

    createEditForm() {
        this.form = this.fb.group({
            term: [],
            definition: [],
            origin: [],
            partSpeech: [],
            translations: this.fb.array([
                this.fb.group({translation: ['']})
            ]),
            synonyms: this.fb.array([
                this.fb.group({synonym: ['']})
            ]),
            examples: this.fb.array([
                this.fb.group({example: ['']})
            ])
        });
    }

    getControls(control: string): AbstractControl[] {
        const formArray = this.form.get(control) as FormArray;
        if (formArray) {
            return formArray.controls;
        }
    }

    addTranslationCtrl() {
        this.translationFormArray = this.form.get('translations') as FormArray;
        this.translationFormArray.push(this.fb.group({translation: ['']}));
    }

    addSynonymCtrl() {
        this.synonymFormArray = this.form.get('synonyms') as FormArray;
        this.synonymFormArray.push(this.fb.group({synonym: ['']}));
    }

    addExampleCtrl() {
        this.exampleFormArray = this.form.get('examples') as FormArray;
        this.exampleFormArray.push(this.fb.group({example: ['']}));
    }

    removeTranslationCtrl(index) {
        this.translationFormArray.removeAt(index);
    }

    removeSynonymCtrl(index) {
        this.synonymFormArray.removeAt(index);
    }

    removeExampleCtrl(index) {
        this.exampleFormArray.removeAt(index);
    }

    updateTerm(term) {
        this.termService.updateTerm(term).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        }).unsubscribe();
    }

    createTerm(term) {
        this.termService.createTerm(term).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        }).unsubscribe();
    }

    submit() {
        const postTerm = new Term();
        postTerm.id = this.term.id;
        postTerm.origin = this.form.get('origin').value ? this.form.get('origin').value : this.term.origin;
        postTerm.partSpeech = this.form.get('partSpeech').value ? this.form.get('partSpeech').value : this.term.partSpeech;
        postTerm.definition = this.form.get('definition').value ? this.form.get('definition').value : this.term.definition;

        for (const control of this.translationFormArray.controls) {

            if (control.value) {
                postTerm.translations.push(control.value);
            }
        }
        for (const control of this.synonymFormArray.controls) {

            if (control.value) {
                postTerm.synonyms.push(control.value);
            }
        }
        for (const control of this.exampleFormArray.controls) {

            if (control.value) {
                postTerm.examples.push(control.value);
            }
        }
    }

    addTerm() {
        this.isAddMode = true;
        this.term = new Term();
    }


    ngOnInit() {
        this.createEditForm();

        const termSubscription = this.termService.termObservable.subscribe(term => {
            this.isAddMode = false;
            this.term = term;
        });

        this.subscriptions.push(termSubscription);
    }

    ngOnDestroy() {
        for (const s of this.subscriptions) {
            s.unsubscribe();
        }
    }

}
