import { Routes } from '@angular/router';
<<<<<<< Updated upstream
import { ChatTutorComponent } from './layout/chat-tutor/chat-tutor.component';
import { DetailComponent } from './layout/detail/detail.component';
import { CreateComponent } from './layout/create/create.component';
import { HomeComponent } from './layout/home/home.component';
import { UpdateComponent } from './layout/update/update.component';

export const routes: Routes = [
  {
    path: 'chat-tutor',
    component: ChatTutorComponent,
  },
  {
    path: 'detail',
    component: DetailComponent,
  },
  {
    path: 'create-tutor',
    component: CreateComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'update-tutor',
    component: UpdateComponent,
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
