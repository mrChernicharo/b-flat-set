import { Directive, OnInit } from "@angular/core";
import { MatInput } from "@angular/material/input";

@Directive({
  selector: "[appAutoFocus]",
})
export class AutoFocusDirective implements OnInit {
  constructor(private matInput: MatInput) {}

  ngOnInit() {
    setTimeout(() => {
      this.matInput.focus();
      // .scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }
}
