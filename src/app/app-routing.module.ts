import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

const routes: Routes = [
  // {path: '', component: AppComponent},
  // {path: '/auth', component: AuthFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
