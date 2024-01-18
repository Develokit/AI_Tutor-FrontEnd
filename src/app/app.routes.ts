import { Routes } from '@angular/router';
import { ChatTutorComponent } from './layout/chat-tutor/chat-tutor.component';
import { DetailComponent } from './layout/detail/detail.component';

export const routes: Routes = [
  {
    path: 'chat-tutor',
    component: ChatTutorComponent,
  },
  {
    path: 'detail',
    component: DetailComponent,
  },
];
