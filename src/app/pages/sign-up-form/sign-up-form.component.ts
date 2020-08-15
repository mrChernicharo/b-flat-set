import { Component, OnInit } from '@angular/core';

/**
 * @title Expansion panel as accordion
 */
@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})

export class SignUpFormComponent implements OnInit  {
  step = 0;

  
  constructor() { 

  }
  
  ngOnInit(): void {
  }
  
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
