import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public hide = true;
  public msg: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.tryKontakt().subscribe((result:any) => {
      console.log(result);
      this.hide = false;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
      this.hide = true;
      this.msg = error.error.msg;
    })
  }

}
