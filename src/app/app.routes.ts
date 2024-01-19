import { Routes } from '@angular/router';
<<<<<<< Updated upstream
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
=======
import {HomeComponent} from "./home/home.component";
import {CreateComponent} from "./tutor/create/create.component";
import {UpdateComponent} from "./tutor/update/update.component";

export const routes: Routes = [
  {
    path: '',
    title: '앱 홈 페이지',
    component: HomeComponent,
  },
  {
    path: 'tutor/create',
    title: '튜터 생성',
    component: CreateComponent,
  },
  {
    path: 'tutor/update',
    title: '튜터 수정&삭제',
    component: UpdateComponent,
  },
];

>>>>>>> Stashed changes
