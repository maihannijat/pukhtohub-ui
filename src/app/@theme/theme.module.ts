import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NbAlertModule,
    NbActionsModule,
    NbButtonModule,
    NbTooltipModule,
    NbCardModule,
    NbInputModule,
    NbLayoutModule,
    NbListModule,
    NbMenuModule,
    NbRouteTabsetModule,
    NbSidebarModule,
    NbTabsetModule,
    NbThemeModule,
    NbUserModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbContextMenuModule,
    NbProgressBarModule,
    NbRadioModule,
    NbStepperModule,
    NbAccordionModule,
    NbSpinnerModule,
    NbSelectModule,
    NbDialogModule, DEFAULT_THEME, NbIconModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutService } from '../@core/services/layout.service';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TermService } from '../@core/services/term.service';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];
const NB_MODULES = [
    NbAlertModule,
    NbButtonModule,
    NbTooltipModule,
    NbCardModule,
    NbInputModule,
    NbLayoutModule,
    NbListModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSelectModule,
    NbDialogModule,
    NbSidebarModule,
    NbStepperModule,
    NbSpinnerModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbContextMenuModule,
    NbSecurityModule, // *nbIsGranted directive,
    NbProgressBarModule,
    NbAccordionModule,
    NbRadioModule,
    NbEvaIconsModule,
    NbIconModule
];

const NB_THEME_PROVIDERS = [
    ...NbThemeModule.forRoot(
        {
            name: 'default',
        },
        [DEFAULT_THEME],
    ).providers,
    ...NbSidebarModule.forRoot().providers,
    ...NbMenuModule.forRoot().providers,
];
const COMPONENTS = [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
];
const PIPES = [];


@NgModule({
    imports: [...BASE_MODULES, ...NB_MODULES],
    exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
    declarations: [...COMPONENTS, ...PIPES],
    entryComponents: [],
})
export class ThemeModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ThemeModule,
            providers: [...NB_THEME_PROVIDERS],
        } as ModuleWithProviders;
    }
}
