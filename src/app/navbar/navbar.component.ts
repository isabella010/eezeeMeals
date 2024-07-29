import { Component, OnInit, ViewChild} from '@angular/core';
import { AccountsService } from '../accounts.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showMenu = false;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(public _accService: AccountsService) { }

  ngOnInit(): void {
  }

}
