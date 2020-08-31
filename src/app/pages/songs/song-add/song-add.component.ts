import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { SongsService } from '../songs.service';
import { Song } from '../song.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.scss']
})
export class SongAddComponent implements OnInit {
  // @ViewChild('form', { static: false }) newSongForm: NgForm
  newSongForm: FormGroup
  // song: Song = {
  //   name: '',
  //   composer: '',
  //   style: '',
  //   key: 'C',
  //   tempo: 100
  // }
  keys = ['A', 'Am', 'Ab', 'Abm', 'G', 'Gm', 'Gb', 'F#m', 'F', 'Fm', 'E', 'Em', 'Eb', 'Ebm', 'D', 'Dm', 'Db', 'C#m', 'C', 'Cm', 'B', 'Bm', 'Bb', 'Bbm']
  initialKey = this.keys[8]

  constructor(
    private songsService: SongsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newSongForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'composer': new FormControl(null, Validators.required),
      'style': new FormControl(null, Validators.required),
      'key': new FormControl('C', Validators.required),
      'tempo': new FormControl(90, [Validators.required, Validators.min(30), Validators.max(300)]),
    })
  }

  cancel() {
    this.router.navigate(['/songs'])
  }

  onSubmit() {
    // console.log(this.song)
    const formName = capitalize(this.newSongForm.get('name').value)
    const formComposer = capitalize(this.newSongForm.get('composer').value)
    const formStyle = capitalize(this.newSongForm.get('style').value)
    const formTempo = this.newSongForm.get('tempo').value
    const formKey = this.newSongForm.get('key').value

    const newSong = new Song(
      formName, formComposer, formStyle, formTempo, formKey
    )
    this.songsService.addSong(newSong).subscribe(data => {
      console.log(data)
    })
    // alert(`${this.song.name} successfuly added to the list`);
    // const { name, composer, style, tempo, key } = form.value;
    // const newSong = new Song(name, composer, style, tempo, key)
    // this.songsService.addSong(newSong);

  }


}

function capitalize(formField: string): string {
  const words = formField.split(' ').map(w => {
    return w.charAt(0).toUpperCase() + w.slice(1)
  })
  return words.join(' ')
}