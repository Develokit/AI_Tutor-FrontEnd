import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TestComponent } from './test/test.component'; // 해당 부분 import 안해주면 에러 발생

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, HeaderComponent, TestComponent],
})
export class AppComponent {
  title = 'AI_Tutor-FrontEnd';
}
