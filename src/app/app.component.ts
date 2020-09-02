import { Component, OnInit } from '@angular/core';
import { SetsService } from './pages/sets/sets.service';
import { AuthService } from './pages/auth/auth.service';
import { SongsService } from './pages/songs/songs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'b-flat-set';

  constructor(private authService: AuthService, private setsService: SetsService, private songsService: SongsService) { }
  ngOnInit() {
    // this.songsService.getSongs()
    this.authService.autoLogin()
    this.setsService.loadSongs()
  }
}
