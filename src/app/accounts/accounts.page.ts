import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

  constructor(    private menu: MenuController) { }

  ngOnInit() {
    this.closeFirst();
  }


  closeFirst(){
    this.menu.enable(false, 'first');
    this.menu.close('first');
  }
}
