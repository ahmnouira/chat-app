import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatViewPage } from './chat-view.page';

const routes: Routes = [
  {
    path: '',
    component: ChatViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatViewPageRoutingModule {}
