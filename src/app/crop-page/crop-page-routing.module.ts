import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CropPagePage } from './crop-page.page';

const routes: Routes = [
  {
    path: '',
    component: CropPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CropPagePageRoutingModule {}
