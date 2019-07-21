import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ThemeModule } from '../@theme/theme.module';
import { TermDetailsComponent } from './term-details/term-details.component';
import { TermSearchComponent } from './term-search/term-search.component';
import { NgbTabsetModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

const PAGES_COMPONENTS = [
    PagesComponent,
    HomeComponent,
];

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NgbTypeaheadModule,
        NgbTabsetModule
    ],
    declarations: [
        ...PAGES_COMPONENTS,
        HomeComponent,
        TermDetailsComponent,
        TermSearchComponent,
    ],
})
export class PagesModule {
}
