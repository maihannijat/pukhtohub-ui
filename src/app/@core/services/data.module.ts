import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from './layout.service';
import { TermService } from './term.service';
import { NbSidebarService } from '@nebular/theme';

const SERVICES = [
    LayoutService,
    TermService,
    NbSidebarService
];

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        ...SERVICES,
    ],
})
export class DataModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DataModule,
            providers: [
                ...SERVICES,
            ],
        } as ModuleWithProviders;
    }
}
