import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

import { MatIconModule } from "@angular/material/icon";
import { MatCardModule, MatCard } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDividerModule } from "@angular/material/divider";

import { MatSelectModule } from "@angular/material/select";
// import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
// import { MatFormField } from '@angular/material/form-field';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatGridListModule } from "@angular/material/grid-list";

import { NavComponent } from "./components/nav/nav.component";
import { AuthComponent } from "./pages/auth/auth.component";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { SetsComponent } from "./pages/sets/sets.component";
import { SongsComponent } from "./pages/songs/songs.component";
import { SongListComponent } from "./pages/songs/song-list/song-list.component";
import { HttpClientModule } from "@angular/common/http";
import { SongAddComponent } from "./pages/songs/song-add/song-add.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { AuthGuard } from "./pages/auth/auth.guard";
import { NewSetComponent } from "./pages/sets/new-set/new-set.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AutoFocusDirective } from "./shared/auto-focus.directive";
import { SongEditComponent } from './pages/songs/song-edit/song-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AuthComponent,
    DashboardComponent,
    SetsComponent,
    SongsComponent,
    SongListComponent,
    SongAddComponent,
    LoadingComponent,
    NewSetComponent,
    AutoFocusDirective,
    SongEditComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DragDropModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatGridListModule,
    MatDividerModule,
    // MatRadioModule,
    // MatFormField,
    // MatCard,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
