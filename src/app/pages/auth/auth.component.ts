import { Component, OnInit } from '@angular/core';
/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
