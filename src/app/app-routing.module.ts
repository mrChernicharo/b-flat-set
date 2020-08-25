import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SongsComponent } from './pages/songs/songs.component';
import { SetsComponent } from './pages/sets/sets.component';
import { SongAddComponent } from './pages/songs/song-add/song-add.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'sets', component: SetsComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'songs/new', component: SongAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
