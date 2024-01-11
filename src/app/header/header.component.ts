import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  onClick() {
    console.log('clicked');
  }
  // contentName은 다른 컴포넌트 연결될 때 해당 내용 input 받아와서 변경되게끔 구현하기
  contentName = 'AI_Tutor';
}
