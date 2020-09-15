import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./pages/auth/auth.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { SongsComponent } from "./pages/songs/songs.component";
import { SetsComponent } from "./pages/sets/sets.component";
import { NewSetComponent } from "./pages/sets/new-set/new-set.component";
import { SongAddComponent } from "./pages/songs/song-add/song-add.component";
import { AuthGuard } from "./pages/auth/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "auth", component: AuthComponent },
  { path: "songs", component: SongsComponent, canActivate: [AuthGuard] },
  { path: "songs/new", component: SongAddComponent, canActivate: [AuthGuard] },
  { path: "sets", component: SetsComponent, canActivate: [AuthGuard] },
  { path: "sets/new", component: NewSetComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
