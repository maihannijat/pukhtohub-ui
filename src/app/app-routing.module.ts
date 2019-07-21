import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    // {
    //   //  path: 'auth',
    //    // loadChildren: './authentication/auth.module#AuthModule'
    // },
    {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
